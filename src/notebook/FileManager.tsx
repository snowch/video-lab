// Copyright © 2026 Christopher Snow
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNotebook, downloadBlob, mediaMime } from "./Workspace";
import { hashBlob, type NotebookFile } from "./model";
import { zipFiles } from "./zip";
import { useRestartGuard } from "../app-status/safety";
import { n } from "./ui.strings";
import "./files.css";
const isTextFile = (name: string) => /\.(txt|md|srt|csv|sh|json)$/i.test(name);
export function FilePreview({ file }: { file: NotebookFile }) {
  const [resource, setResource] = useState<
    { key: string; file: NotebookFile } | { error: true }
  >();
  useEffect(() => {
    let live = true;
    void hashBlob(file.blob).then(
      (hash) => {
        if (!live) return;
        const key = JSON.stringify([
          file.name,
          file.blob.type || mediaMime(file.name),
          hash,
        ]);
        // IndexedDB reads clone Blobs, including unchanged files. Keep their
        // player and URL until the actual bytes, name or media type change.
        setResource((current) =>
          current && "key" in current && current.key === key
            ? current
            : { key, file },
        );
      },
      () => {
        if (live) setResource({ error: true });
      },
    );
    return () => {
      live = false;
    };
  }, [file.blob, file.name]);
  if (!resource) return null;
  if ("error" in resource) return <p>{n.noPreview}</p>;
  return <PreviewResource key={resource.key} file={resource.file} />;
}
function PreviewResource({ file }: { file: NotebookFile }) {
  const media = useRef<HTMLMediaElement>(null);
  const [url, setUrl] = useState(""),
    [text, setText] = useState(""),
    [failed, setFailed] = useState(false);
  useEffect(() => {
    const u = URL.createObjectURL(file.blob);
    setUrl(u);
    setFailed(false);
    let live = true;
    if (isTextFile(file.name))
      void file.blob
        .slice(0, 200000)
        .text()
        .then((t) => {
          if (live)
            setText(
              t + (file.blob.size > 200000 ? "\n" + n.previewTruncated : ""),
            );
        });
    else setText("");
    return () => {
      live = false;
      URL.revokeObjectURL(u);
    };
  }, [file.blob, file.name]);
  // Detach the decoder during layout cleanup, before the passive effect
  // revokes this resource's URL. A replacement gets a fresh media element
  // and local error state, so queued events cannot poison the next file.
  useLayoutEffect(() => {
    const element = media.current;
    return () => {
      if (!element) return;
      element.pause();
      element.removeAttribute("src");
      element.load();
    };
  }, [url]);
  if (!url) return null;
  const mime = file.blob.type || mediaMime(file.name);
  return (
    <div
      className="notebook-preview"
      aria-label={`${n.filePreview}: ${file.name}`}
    >
      {failed ? (
        <p>{n.noPreview}</p>
      ) : mime.startsWith("video/") ? (
        <video
          ref={(element) => {
            media.current = element;
          }}
          src={url}
          controls
          preload="metadata"
          onError={() => setFailed(true)}
        />
      ) : mime.startsWith("audio/") ? (
        <audio
          ref={(element) => {
            media.current = element;
          }}
          src={url}
          controls
          preload="metadata"
          onError={() => setFailed(true)}
        />
      ) : mime.startsWith("image/") ? (
        <img src={url} alt={file.name} onError={() => setFailed(true)} />
      ) : text ? (
        <pre tabIndex={0}>{text}</pre>
      ) : (
        <p>{n.noPreview}</p>
      )}
    </div>
  );
}
function fileSize(bytes: number) {
  const unit = bytes < 1000000 ? "KB" : "MB";
  const size = bytes / (unit === "KB" ? 1000 : 1000000);
  return `${new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(bytes > 0 ? Math.max(0.1, size) : 0)} ${unit}`;
}
function originLabel(file: NotebookFile) {
  if (file.origin === "provided")
    return (file.blob.type || mediaMime(file.name)).startsWith("video/")
      ? n.originPracticeVideo
      : n.originPracticeFile;
  return {
    captured: n.originRecording,
    imported: n.originImported,
    generated: n.originOutput,
    recipe: n.originRecipe,
    report: n.originReport,
    note: n.originText,
  }[file.origin];
}
type Form = {
  kind: "folder" | "text" | "move" | "copy" | "delete";
  from?: string;
};
type FileDraft = {
  cwd: string;
  selected: string;
  text: string;
  dirty: boolean;
  form?: Form;
  name: string;
};
// Route changes can unmount the notebook. Keep pending edits in this app instance;
// the App-level restart/unload guards also read this snapshot while it is unmounted.
let pendingFileDraft: FileDraft | undefined;
export function hasPendingFileDraft() {
  return pendingFileDraft !== undefined;
}
export function FileManager({
  open,
  onClose,
  hasEarlierWork = false,
}: {
  open: boolean;
  onClose: () => void;
  hasEarlierWork?: boolean;
}) {
  const restoredDraft = useRef(pendingFileDraft);
  const w = useNotebook(),
    dialog = useRef<HTMLDialogElement>(null),
    picker = useRef<HTMLInputElement>(null),
    folderPicker = useRef<HTMLInputElement>(null),
    importButton = useRef<HTMLButtonElement>(null),
    [cwd, setCwd] = useState(() => restoredDraft.current?.cwd ?? ""),
    [search, setSearch] = useState(""),
    [selected, setSelected] = useState(
      () => restoredDraft.current?.selected ?? "",
    ),
    [text, setText] = useState(() => restoredDraft.current?.text ?? ""),
    [dirty, setDirty] = useState(() => restoredDraft.current?.dirty ?? false),
    [form, setForm] = useState<Form | undefined>(
      () => restoredDraft.current?.form,
    ),
    [name, setName] = useState(() => restoredDraft.current?.name ?? ""),
    [error, setError] = useState(""),
    [confirmClose, setConfirmClose] = useState(false);
  const textEditor = useRef<HTMLTextAreaElement>(null),
    focusEditor = useRef(false),
    fileRequest = useRef(0);
  useLayoutEffect(() => {
    if (focusEditor.current && textEditor.current) {
      focusEditor.current = false;
      textEditor.current.focus();
    }
  });
  const returnTo = useRef<HTMLElement | null>(null),
    restoreFormFocus = useRef(false),
    formInput = useRef<HTMLInputElement>(null),
    formCancel = useRef<HTMLButtonElement>(null),
    keepEditing = useRef<HTMLButtonElement>(null);
  useRestartGuard(() => !dirty && !form && !confirmClose);
  useLayoutEffect(() => {
    pendingFileDraft =
      dirty || form ? { cwd, selected, text, dirty, form, name } : undefined;
  }, [cwd, selected, text, dirty, form, name]);
  useEffect(() => {
    if (open) {
      if (!dialog.current?.open) dialog.current?.showModal();
    } else if (dialog.current?.open) dialog.current.close();
  }, [open]);
  useEffect(() => {
    if (open && form)
      (form.kind === "delete"
        ? formCancel.current
        : formInput.current
      )?.focus();
  }, [form, open]);
  useEffect(() => {
    if (
      !restoreFormFocus.current ||
      form ||
      w.busy ||
      dirty ||
      confirmClose ||
      !dialog.current?.open
    )
      return;
    restoreFormFocus.current = false;
    if (returnTo.current?.isConnected) returnTo.current.focus();
    else importButton.current?.focus();
  }, [form, w.busy, dirty, confirmClose]);
  useEffect(() => {
    if (confirmClose) keepEditing.current?.focus();
  }, [confirmClose]);
  useEffect(() => {
    folderPicker.current?.setAttribute("webkitdirectory", "");
  }, [confirmClose]);
  const current = w.files[selected];
  function requestClose() {
    if (dirty || form) {
      setConfirmClose(true);
      return;
    }
    dialog.current?.close();
  }
  function begin(next: Form) {
    if (dirty) {
      setError(n.dirty);
      return;
    }
    const active = document.activeElement as HTMLElement | null;
    const disclosure = active?.closest("details");
    restoreFormFocus.current = false;
    returnTo.current = disclosure?.querySelector("summary") ?? active;
    if (disclosure) disclosure.open = false;
    setForm(next);
    setName(
      next.kind === "move"
        ? next.from!
        : next.kind === "copy"
          ? next.from!.replace(/(\.[^.]+)?$/, "-copy$1")
          : cwd +
            (cwd ? "/" : "") +
            (next.kind === "folder" ? "new-folder" : "note.txt"),
    );
    setError("");
  }
  function cancelForm() {
    restoreFormFocus.current = true;
    setForm(undefined);
  }
  async function perform(work: () => Promise<void>) {
    setError("");
    try {
      await work();
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      return false;
    }
  }
  async function imported(list: FileList | null) {
    if (!list?.length) return;
    await perform(() =>
      w.add(
        [...list].map((file) => ({
          name: (cwd ? cwd + "/" : "") + (file.webkitRelativePath || file.name),
          blob: file,
          origin: "imported",
        })),
      ),
    );
    if (picker.current) picker.current.value = "";
    if (folderPicker.current) folderPicker.current.value = "";
  }
  async function showFile(name: string, edit = false) {
    if (dirty) {
      setError(n.dirty);
      return;
    }
    const request = ++fileRequest.current;
    const file = w.files[name];
    const contents = file && isTextFile(name) ? await file.blob.text() : "";
    if (request !== fileRequest.current || !dialog.current?.open) return;
    focusEditor.current = edit;
    if (edit && selected === name && textEditor.current) {
      focusEditor.current = false;
      textEditor.current.focus();
    }
    setText(contents);
    setSelected(name);
    setError("");
  }
  const prefix = cwd ? cwd + "/" : "";
  const directorySet = new Set<string>(w.folders);
  for (const path of [...Object.keys(w.files), ...w.folders]) {
    const parts = path.split("/");
    parts.pop();
    while (parts.length) {
      directorySet.add(parts.join("/"));
      parts.pop();
    }
  }
  const allEntries = [
    ...Array.from(directorySet)
      .filter(
        (p) => p.startsWith(prefix) && !p.slice(prefix.length).includes("/"),
      )
      .map((path) => ({ path, folder: true })),
    ...Object.keys(w.files)
      .filter(
        (p) => p.startsWith(prefix) && !p.slice(prefix.length).includes("/"),
      )
      .map((path) => ({ path, folder: false })),
  ].sort(
    (a, b) =>
      Number(b.folder) - Number(a.folder) || a.path.localeCompare(b.path),
  );
  const entries = allEntries.filter(
    (f) => !search || f.path.toLowerCase().includes(search.toLowerCase()),
  );
  const fileCount = Object.keys(w.files).length;
  const totalBytes = Object.values(w.files).reduce(
    (sum, f) => sum + f.blob.size,
    0,
  );
  const nearLimit =
    fileCount / 64 >= 0.8 || totalBytes / (32 * 1024 * 1024) >= 0.8;
  const blocked = w.busy || dirty || Boolean(form);
  return (
    <dialog
      className="notebook-files notebook-files-simple"
      ref={dialog}
      aria-labelledby="notebook-files-title"
      aria-describedby="notebook-files-intro"
      onPointerDown={(e) => {
        for (const menu of dialog.current?.querySelectorAll<HTMLDetailsElement>(
          ".notebook-row-options[open]",
        ) ?? []) {
          if (!menu.contains(e.target as Node)) menu.open = false;
        }
      }}
      onKeyDown={(e) => {
        if (e.key !== "Escape") return;
        const expanded = [
          ...(dialog.current?.querySelectorAll<HTMLDetailsElement>(
            "details[open]",
          ) ?? []),
        ];
        const activeDisclosure = (
          document.activeElement as HTMLElement | null
        )?.closest("details");
        const disclosure = activeDisclosure?.open
          ? activeDisclosure
          : expanded.at(-1);
        if (disclosure) {
          e.preventDefault();
          e.stopPropagation();
          disclosure.open = false;
          disclosure.querySelector("summary")?.focus();
        }
      }}
      onCancel={(e) => {
        if (dirty || form) {
          e.preventDefault();
          setConfirmClose(true);
        }
      }}
      onClose={() => {
        fileRequest.current++;
        pendingFileDraft = undefined;
        restoreFormFocus.current = false;
        setSelected("");
        setForm(undefined);
        setDirty(false);
        setConfirmClose(false);
        setError("");
        dialog.current
          ?.querySelectorAll("details[open]")
          .forEach((details) => details.removeAttribute("open"));
        onClose();
      }}
    >
      <header>
        <h2 id="notebook-files-title">{n.yourFiles}</h2>
        <button onClick={requestClose}>{n.close}</button>
      </header>
      <p id="notebook-files-intro" className="muted">
        {n.filesIntro}
      </p>
      {error && (
        <p role="alert" className="notebook-error">
          {error}
        </p>
      )}
      {confirmClose && (
        <section aria-label={n.dirty} className="notebook-file-form">
          <p>{n.dirty}</p>
          <button
            onClick={() => {
              setDirty(false);
              setForm(undefined);
              setConfirmClose(false);
              dialog.current?.close();
            }}
          >
            {n.discard}
          </button>
          <button
            ref={keepEditing}
            onClick={() => {
              setConfirmClose(false);
              requestAnimationFrame(() => {
                if (form)
                  (form.kind === "delete"
                    ? formCancel.current
                    : formInput.current
                  )?.focus();
                else dialog.current?.querySelector("textarea")?.focus();
              });
            }}
          >
            {n.keep}
          </button>
        </section>
      )}
      {!confirmClose && (
        <>
          <div className="notebook-file-tools">
            <button
              className="primary notebook-import-primary"
              ref={importButton}
              disabled={blocked}
              onClick={() => picker.current?.click()}
            >
              {n.import}
            </button>
            <details className="notebook-file-options">
              <summary>{n.moreFileOptions}</summary>
              <div className="notebook-file-options-content">
                <div className="notebook-file-option-buttons">
                  {typeof HTMLInputElement !== "undefined" &&
                    "webkitdirectory" in HTMLInputElement.prototype && (
                      <button
                        disabled={blocked}
                        onClick={() => folderPicker.current?.click()}
                      >
                        {n.importFolder}
                      </button>
                    )}
                  <button
                    disabled={blocked}
                    onClick={() => begin({ kind: "folder" })}
                  >
                    {n.newFolder}
                  </button>
                  <button
                    disabled={blocked}
                    onClick={() => begin({ kind: "text" })}
                  >
                    {n.newText}
                  </button>
                  <button
                    disabled={w.busy || !fileCount}
                    onClick={() =>
                      void perform(async () =>
                        downloadBlob(
                          "video-lab-files.zip",
                          await zipFiles(Object.values(w.files)),
                        ),
                      )
                    }
                  >
                    {n.downloadAll}
                  </button>
                </div>
                <p className="muted">{n.storageNote}</p>
              </div>
            </details>
          </div>
          <input
            ref={picker}
            type="file"
            multiple
            hidden
            onChange={(e) => void imported(e.target.files)}
          />
          <input
            ref={folderPicker}
            type="file"
            multiple
            hidden
            onChange={(e) => void imported(e.target.files)}
          />
          {(directorySet.size > 0 || cwd) && (
            <nav className="notebook-breadcrumb" aria-label={n.root}>
              <button
                disabled={blocked}
                aria-current={!cwd ? "location" : undefined}
                onClick={() => {
                  setCwd("");
                  setSelected("");
                }}
              >
                {n.root}
              </button>
              {cwd
                .split("/")
                .filter(Boolean)
                .map((part, i, all) => (
                  <button
                    key={i}
                    disabled={blocked}
                    aria-current={i === all.length - 1 ? "location" : undefined}
                    onClick={() => {
                      setCwd(all.slice(0, i + 1).join("/"));
                      setSelected("");
                    }}
                  >
                    {part}
                  </button>
                ))}
            </nav>
          )}
          {(allEntries.length > 8 || search) && (
            <label className="notebook-file-search">
              {n.filter}
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          )}
          {form && (
            <form
              className="notebook-file-form"
              onSubmit={(e) => {
                e.preventDefault();
                void (async () => {
                  const ok = await perform(() =>
                    form.kind === "folder"
                      ? w.folder(name)
                      : form.kind === "text"
                        ? w.writeText(name, "", true)
                        : form.kind === "move"
                          ? w.move(form.from!, name)
                          : form.kind === "copy"
                            ? w.copy(form.from!, name)
                            : w.remove(form.from!),
                  );
                  if (ok) {
                    if (selected === form.from)
                      setSelected(form.kind === "move" ? name : "");
                    if (
                      form.kind === "delete" &&
                      form.from &&
                      (cwd === form.from || cwd.startsWith(form.from + "/"))
                    )
                      setCwd("");
                    cancelForm();
                  }
                })();
              }}
            >
              <h3>
                {form.kind === "delete"
                  ? n.confirmDelete
                  : form.kind === "folder"
                    ? n.newFolder
                    : form.kind === "text"
                      ? n.newText
                      : form.kind === "move"
                        ? n.rename
                        : n.copyFile}
              </h3>
              {form.kind === "delete" ? (
                <>
                  <p>
                    <code>{form.from}</code>
                  </p>
                  <p>{n.deleteNote}</p>
                </>
              ) : (
                <label>
                  {n.name}
                  <input
                    ref={formInput}
                    disabled={w.busy}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck={false}
                  />
                </label>
              )}
              <button disabled={w.busy}>
                {form.kind === "delete" ? n.delete : n.save}
              </button>
              <button
                type="button"
                ref={formCancel}
                disabled={w.busy}
                onClick={cancelForm}
              >
                {n.keep}
              </button>
            </form>
          )}
          <ul className="notebook-file-list">
            {entries.map((entry) => (
              <li key={entry.path}>
                <div>
                  <button
                    className="notebook-file-name"
                    disabled={blocked}
                    onClick={() =>
                      entry.folder
                        ? (setCwd(entry.path), setSelected(""))
                        : void showFile(entry.path)
                    }
                  >
                    {entry.folder ? "▸ " : ""}
                    {entry.path.slice(prefix.length)}
                  </button>
                  <small>
                    {entry.folder
                      ? n.folderLabel
                      : `${fileSize(w.files[entry.path]!.blob.size)} · ${originLabel(w.files[entry.path]!)}`}
                  </small>
                </div>
                <div className="notebook-file-actions">
                  {!entry.folder && isTextFile(entry.path) && (
                    <button
                      disabled={blocked}
                      aria-label={`${n.editFile} ${entry.path}`}
                      onClick={() => void showFile(entry.path, true)}
                    >
                      {n.editFile}
                    </button>
                  )}
                  {!entry.folder && (
                    <button
                      disabled={w.busy}
                      onClick={() =>
                        downloadBlob(entry.path, w.files[entry.path]!.blob)
                      }
                      aria-label={`${n.download} ${entry.path}`}
                    >
                      {n.download}
                    </button>
                  )}
                  <details
                    className="notebook-row-options"
                    onToggle={(e) => {
                      const menu = e.currentTarget;
                      if (!menu.open) return;
                      for (const other of dialog.current?.querySelectorAll<HTMLDetailsElement>(
                        ".notebook-row-options[open]",
                      ) ?? []) {
                        if (other !== menu) other.open = false;
                      }
                      const panel = menu.querySelector<HTMLElement>(
                        ".notebook-row-option-buttons",
                      );
                      if (!panel || !dialog.current) return;
                      const bounds = dialog.current.getBoundingClientRect();
                      const trigger = menu.getBoundingClientRect();
                      // Keep the menu inside the dialog, including its last row.
                      panel.style.maxWidth = `${Math.max(0, trigger.right - bounds.left - 16)}px`;
                      const below =
                        Math.min(bounds.bottom, innerHeight) -
                        trigger.bottom -
                        16;
                      const above = trigger.top - Math.max(bounds.top, 0) - 16;
                      menu.dataset.side =
                        panel.offsetHeight > below && above > below
                          ? "up"
                          : "down";
                    }}
                  >
                    <summary aria-label={`${n.moreActions}: ${entry.path}`}>
                      {n.moreActions}
                    </summary>
                    <div className="notebook-row-option-buttons">
                      <button
                        disabled={blocked}
                        aria-label={`${n.rename} ${entry.path}`}
                        onClick={() =>
                          begin({ kind: "move", from: entry.path })
                        }
                      >
                        {n.rename}
                      </button>
                      {!entry.folder && (
                        <button
                          disabled={blocked}
                          aria-label={`${n.copyFile} ${entry.path}`}
                          onClick={() =>
                            begin({ kind: "copy", from: entry.path })
                          }
                        >
                          {n.copyFile}
                        </button>
                      )}
                      <button
                        disabled={blocked}
                        aria-label={`${n.delete} ${entry.path}`}
                        onClick={() =>
                          begin({ kind: "delete", from: entry.path })
                        }
                      >
                        {n.delete}
                      </button>
                    </div>
                  </details>
                </div>
              </li>
            ))}
          </ul>
          {!entries.length && (
            <p>{search ? n.noSearchMatches : cwd ? n.empty : n.noFiles}</p>
          )}
          {current && (
            <section className="notebook-file-open">
              <h3>{selected}</h3>
              {!isTextFile(current.name) && <FilePreview file={current} />}
              {isTextFile(current.name) && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    void perform(() => w.writeText(current.name, text)).then(
                      (ok) => {
                        if (ok) setDirty(false);
                      },
                    );
                  }}
                >
                  <label>
                    {n.editText}
                    <textarea
                      ref={textEditor}
                      disabled={w.busy}
                      value={text}
                      onChange={(e) => {
                        setText(e.target.value);
                        setDirty(true);
                      }}
                      spellCheck={false}
                    />
                  </label>
                  <button disabled={w.busy || !dirty}>{n.save}</button>
                  {dirty && <span role="status">{n.dirty}</span>}
                </form>
              )}
            </section>
          )}
          {nearLimit && (
            <p className="notebook-file-limits">
              {n.nearFileLimit} {n.fileLimits}
            </p>
          )}
          {hasEarlierWork && (
            <button
              disabled={blocked}
              onClick={() => {
                dialog.current?.close();
                location.hash = "#/earlier";
              }}
            >
              {n.earlierWork}
            </button>
          )}
        </>
      )}
    </dialog>
  );
}
