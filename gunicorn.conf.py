import os

bind = 'unix:/tmp/nginx.socket'
 
def pre_fork(server, worker):
    os.mkdir('/tmp/app-initialized')
