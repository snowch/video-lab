# Copyright © 2026 Christopher Snow
import subprocess, pathlib, os, time, json, hashlib, shutil
root = pathlib.Path('/workspace/scratch/capture-guide')
display = ':97'
env = dict(os.environ, DISPLAY=display)
(root/'example.txt').write_text('Starting state\nPrepare one visible action and a readable result.\n')
xlog = (root/'xvfb.log').open('w')
xvfb = subprocess.Popen(['/workspace/scratch/native-capture/runtime/usr/bin/Xvfb', display, '-screen', '0', '1280x720x24', '-nolisten', 'tcp'], stdout=xlog, stderr=xlog)
editor = None
try:
 time.sleep(.7)
 elog=(root/'editor.log').open('w')
 editor=subprocess.Popen(['dbus-run-session','--','mousepad','--disable-server',str(root/'example.txt')],env=env,stdout=elog,stderr=elog)
 time.sleep(1.5)
 args=['ffmpeg','-f','x11grab','-framerate','15','-video_size','1280x720','-i',display+'+0,0','-t','5','-an','-vf','scale=trunc(iw/2)*2:trunc(ih/2)*2','-c:v','libx264','-pix_fmt','yuv420p',str(root/'screen-linux.mp4')]
 log=(root/'ffmpeg.log').open('w')
 proc=subprocess.Popen(args,env=env,stdout=log,stderr=log)
 time.sleep(1.5)
 if shutil.which('xdotool'):
  subprocess.run(['xdotool','type','--clearmodifiers','One action recorded in a real text editor.'],env=env,check=True)
 code=proc.wait(timeout=20)
 if code: raise RuntimeError('Native capture failed '+str(code))
 probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(root/'screen-linux.mp4')]))
 video=probe['streams'][0]
 assert video['codec_name']=='h264' and video['pix_fmt']=='yuv420p'
 assert int(video['nb_frames'])==75 and float(probe['format']['duration'])==5
 assert len(probe['streams'])==1
 result={'command':args,'native_version':subprocess.check_output(['ffmpeg','-version'],text=True).splitlines()[0],'exit':code,'sha256':hashlib.sha256((root/'screen-linux.mp4').read_bytes()).hexdigest(),'bytes':(root/'screen-linux.mp4').stat().st_size,'width':video['width'],'height':video['height'],'pictures':video['nb_frames'],'duration':probe['format']['duration'],'streams':len(probe['streams'])}
 (root/'native-result.json').write_text(json.dumps(result,indent=2))
 (root/'probe.json').write_text(json.dumps(probe,indent=2))
 print(json.dumps(result))
finally:
 if editor: editor.terminate(); editor.wait(timeout=10)
 xvfb.terminate(); xvfb.wait(timeout=10)
