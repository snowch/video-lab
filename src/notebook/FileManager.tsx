// Copyright © 2026 Christopher Snow
import { useEffect, useRef, useState } from "react";
import { useNotebook, downloadBlob, mediaMime } from "./Workspace";
import type { NotebookFile } from "./model";
import { practiceAssets } from "./assets";
import { zipFiles } from "./zip";
import { useRestartGuard } from "../app-status/safety";
import { n } from "./ui.strings";
export function FilePreview({ file }: { file: NotebookFile }) {
  const [url, setUrl] = useState(""),
    [text, setText] = useState(""),
    [failed, setFailed] = useState(false);
  useEffect(() => {
    const u = URL.createObjectURL(file.blob);
    setUrl(u);
    setFailed(false);
    let live = true;
    if (/\.(txt|md|srt|csv|sh|json)$/i.test(file.name))
      void file.blob
        .slice(0, 200000)
        .text()
        .then((t) => {
          if (live)
            setText(
              t +
                (file.blob.size > 200000
                  ? "\n[Preview truncated; download the complete file.]"
                  : ""),
            );
        });
    else setText("");
    return () => {
      live = false;
      URL.revokeObjectURL(u);
    };
  }, [file.blob, file.name]);
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
          src={url}
          controls
          preload="metadata"
          onError={() => setFailed(true)}
        />
      ) : mime.startsWith("audio/") ? (
        <audio
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
type Form = {
  kind: "folder" | "text" | "move" | "copy" | "delete";
  from?: string;
};
export function FileManager({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const w = useNotebook(),
    dialog = useRef<HTMLDialogElement>(null),
    picker = useRef<HTMLInputElement>(null),
    folderPicker = useRef<HTMLInputElement>(null),
    [cwd, setCwd] = useState(""),
    [search, setSearch] = useState(""),
    [selected, setSelected] = useState(""),
    [text, setText] = useState(""),
    [dirty, setDirty] = useState(false),
    [form, setForm] = useState<Form>(),
    [name, setName] = useState(""),
    [error, setError] = useState(""),
    [confirmClose, setConfirmClose] = useState(false),
    [asset, setAsset] = useState("bunny.mp4");
  const returnTo = useRef<HTMLElement | null>(null),
    formInput = useRef<HTMLInputElement>(null);
  useRestartGuard(() => !dirty && !form && !confirmClose);
  useEffect(() => {
    if (open) {
      if (!dialog.current?.open) dialog.current?.showModal();
    } else if (dialog.current?.open) dialog.current.close();
  }, [open]);
  useEffect(() => {
    if (form) formInput.current?.focus();
  }, [form]);
  useEffect(() => {
    folderPicker.current?.setAttribute("webkitdirectory", "");
  }, []);
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
    returnTo.current = document.activeElement as HTMLElement;
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
    setForm(undefined);
    requestAnimationFrame(() => returnTo.current?.focus());
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
  async function showFile(name: string) {
    if (dirty) {
      setError(n.dirty);
      return;
    }
    setSelected(name);
    setError("");
    const file = w.files[name];
    if (file && /\.(txt|md|srt|csv|sh|json)$/i.test(name))
      setText(await file.blob.text());
    else setText("");
  }
  const prefix = cwd ? cwd + "/" : "";
  const directorySet = new Set<string>(w.folders);
  for (const path of Object.keys(w.files)) {
    const parts = path.split("/");
    parts.pop();
    while (parts.length) {
      directorySet.add(parts.join("/"));
      parts.pop();
    }
  }
  const entries = [
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
  ]
    .filter(
      (f) => !search || f.path.toLowerCase().includes(search.toLowerCase()),
    )
    .sort(
      (a, b) =>
        Number(b.folder) - Number(a.folder) || a.path.localeCompare(b.path),
    );
  const blocked = w.busy || dirty || Boolean(form);
  return (
    <dialog
      className="notebook-files"
      ref={dialog}
      aria-labelledby="notebook-files-title"
      onCancel={(e) => {
        if (dirty || form) {
          e.preventDefault();
          setConfirmClose(true);
        }
      }}
      onClose={() => {
        setSelected("");
        setForm(undefined);
        setDirty(false);
        setConfirmClose(false);
        setError("");
        onClose();
      }}
    >
      <header>
        <h2 id="notebook-files-title">{n.files}</h2>
        <button onClick={requestClose}>{n.close}</button>
      </header>
      <p>
        {Object.keys(w.files).length} / 64 ·{" "}
        {(
          Object.values(w.files).reduce((sum, f) => sum + f.blob.size, 0) /
          1048576
        ).toFixed(2)}{" "}
        / 32 MiB
      </p>
      <p className="muted">{n.storageNote}</p>
      {error && (
        <p role="alert" className="notebook-error">
          {error}
        </p>
      )}
      {confirmClose && (
        <section aria-label={n.dirty}>
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
          <button autoFocus onClick={() => setConfirmClose(false)}>
            {n.keep}
          </button>
        </section>
      )}
      {!confirmClose && (
        <>
          <div className="notebook-file-tools">
            <button disabled={blocked} onClick={() => picker.current?.click()}>
              {n.import}
            </button>
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
            <button disabled={blocked} onClick={() => begin({ kind: "text" })}>
              {n.newText}
            </button>
            <button
              disabled={w.busy || !Object.keys(w.files).length}
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
          <form
            className="notebook-add-asset"
            onSubmit={(e) => {
              e.preventDefault();
              void perform(() => w.load([asset]));
            }}
          >
            <label>
              {n.source}
              <select
                value={asset}
                onChange={(e) => setAsset(e.target.value)}
                disabled={blocked}
              >
                {Object.keys(practiceAssets).map((name) => (
                  <option key={name}>{name}</option>
                ))}
              </select>
            </label>
            <button disabled={blocked}>{n.load}</button>
          </form>
          <nav className="notebook-breadcrumb" aria-label={n.root}>
            <button
              disabled={blocked}
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
                  onClick={() => {
                    setCwd(all.slice(0, i + 1).join("/"));
                    setSelected("");
                  }}
                >
                  {part}
                </button>
              ))}
          </nav>
          <label>
            {n.filter}
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
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
              <button type="button" onClick={cancelForm}>
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
                  {!entry.folder && (
                    <small>
                      {w.files[entry.path]!.blob.size.toLocaleString()} B ·{" "}
                      {w.files[entry.path]!.origin}
                    </small>
                  )}
                </div>
                <div className="notebook-file-actions">
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
                  <button
                    disabled={blocked}
                    aria-label={`${n.rename} ${entry.path}`}
                    onClick={() => begin({ kind: "move", from: entry.path })}
                  >
                    {n.rename}
                  </button>
                  {!entry.folder && (
                    <button
                      disabled={blocked}
                      aria-label={`${n.copyFile} ${entry.path}`}
                      onClick={() => begin({ kind: "copy", from: entry.path })}
                    >
                      {n.copyFile}
                    </button>
                  )}
                  <button
                    disabled={blocked}
                    aria-label={`${n.delete} ${entry.path}`}
                    onClick={() => begin({ kind: "delete", from: entry.path })}
                  >
                    {n.delete}
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {!entries.length && <p>{n.empty}</p>}
          {current && (
            <section className="notebook-file-open">
              <h3>{selected}</h3>
              {!/\.(txt|md|srt|csv|sh|json)$/i.test(current.name) && (
                <FilePreview file={current} />
              )}{" "}
              {/\.(txt|md|srt|csv|sh|json)$/i.test(current.name) && (
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
          <p className="muted">{n.limits}</p>
          <button
            disabled={blocked}
            onClick={() => {
              dialog.current?.close();
              location.hash = "#/earlier";
            }}
          >
            {n.earlierWork}
          </button>
        </>
      )}
    </dialog>
  );
}
