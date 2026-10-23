# Copyright © 2026 Christopher Snow
import ctypes as c, time, sys
x=c.CDLL('libX11.so.6');t=c.CDLL('libXtst.so.6')
x.XOpenDisplay.argtypes=[c.c_char_p];x.XOpenDisplay.restype=c.c_void_p
x.XStringToKeysym.argtypes=[c.c_char_p];x.XStringToKeysym.restype=c.c_ulong
x.XKeysymToKeycode.argtypes=[c.c_void_p,c.c_ulong];x.XKeysymToKeycode.restype=c.c_uint
x.XFlush.argtypes=[c.c_void_p]
t.XTestFakeKeyEvent.argtypes=[c.c_void_p,c.c_uint,c.c_int,c.c_ulong]
t.XTestFakeMotionEvent.argtypes=[c.c_void_p,c.c_int,c.c_int,c.c_int,c.c_ulong]
t.XTestFakeButtonEvent.argtypes=[c.c_void_p,c.c_uint,c.c_int,c.c_ulong]
d=x.XOpenDisplay(b':88')
def key(name,down):t.XTestFakeKeyEvent(d,x.XKeysymToKeycode(d,x.XStringToKeysym(name.encode())),down,0);x.XFlush(d)
def chord(keys):
 for k in keys:key(k,1)
 for k in reversed(keys):key(k,0)
 time.sleep(.1)
def text(s):
 for v in s:
  sym={' ':'space','-':'minus','.':'period','/':'slash','_':'underscore'}.get(v,v)
  chord([sym])
def click(px,py):
 t.XTestFakeMotionEvent(d,-1,int(px),int(py),0);t.XTestFakeButtonEvent(d,1,1,0);t.XTestFakeButtonEvent(d,1,0,0);x.XFlush(d);time.sleep(.1)
if __name__=='__main__':
 if sys.argv[1]=='key':chord(sys.argv[2:])
 if sys.argv[1]=='type':text(sys.argv[2])
 if sys.argv[1]=='click':click(*sys.argv[2:])
