# Copyright © 2026 Christopher Snow
import subprocess,time,sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
import control
cmd=['ffmpeg','-hide_banner','-y','-f','x11grab','-framerate','15','-video_size','1280x720','-draw_mouse','1','-i',':88.0+0,0','-t','12','-an','-c:v','libx264','-preset','slow','-crf','23','-pix_fmt','yuv420p','-movflags','+faststart','public/media/mousepad-demo.mp4']
with open('/tmp/video-lab-mousepad-capture.log','w') as log:
 p=subprocess.Popen(cmd,stdout=log,stderr=log)
 time.sleep(2.5)
 control.chord(['Control_L','r'])
 time.sleep(.3)
 control.chord(['Control_L','a'])
 control.text('staging')
 control.chord(['Tab'])
 control.text('production')
 time.sleep(.4)
 control.click(735,521)
 time.sleep(.7)
 control.click(824,521)
 p.wait()
 sys.exit(p.returncode)
