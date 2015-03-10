#!/usr/bin/env python
import logging
import tornado.ioloop
import tornado.options
import tornado.web
import json
from tornado.options import define, options

define("port", default=5000, help="run on the given port", type=int)


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        try:
            json.dumps(MessageMixin.cache)
        except KeyError:
            raise tornado.web.HTTPError(404)
            
class Test(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello world")


class MessageMixin(object):
    waiters = {}
    cache = {}
    cache_size = 200

    def wait_for_messages(self, callback, cursor=None):
        t = self.thread_id
        cache = self.cache.setdefault(t, [])
        waiters = self.waiters.setdefault(t, [])

        if cursor:
            index = 0
            for i in xrange(len(cache)):
                index = len(cache) - i - 1
                if cache[index]["id"] == cursor:
                    break
            recent = cache[index + 1:]
            if recent:
                callback(recent)
                return None
        waiters.append(callback)

    def new_messages(self, posts):
        t = self.thread_id
        cache = self.cache.setdefault(t, [])
        waiters = self.waiters.setdefault(t, [])

        for callback in waiters:
            try:
                callback(posts)
            except Exception:
                logging.error("Error in waiter callback", exc_info=True)
        waiters = []
        cache.extend(posts)
        if len(cache) > self.cache_size:
            cache = cache[-self.cache_size:]


class MessageNewHandler(MainHandler, MessageMixin):
    def post(self, thread_id):
        self.thread_id = thread_id
        post = self.get_argument("html")
        redirect_to = self.get_argument("next", None)
        if redirect_to:
            self.redirect(redirect_to)
        else:
            self.write(post)
        self.new_messages([post])


class MessageUpdatesHandler(MainHandler, MessageMixin):
    @tornado.web.asynchronous
    def post(self, thread_id):
        self.thread_id = thread_id
        try:
            self.wait_for_messages(self.on_new_messages,
                                   cursor=self.get_argument("cursor", None))
        except KeyError:
            raise tornado.web.HTTPError(404)

    def on_new_messages(self, posts):
        # Closed client connection
        if self.request.connection.stream.closed():
            return None
        self.finish({"posts": posts})


class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r"/api/1\.0/stream/(\d+)", MessageUpdatesHandler),
            (r"/api/1\.0/streamp/(\d+)", MessageNewHandler),
            (r"/test", Test),
        ]
        tornado.web.Application.__init__(self, handlers)


def main():
    tornado.options.parse_command_line()
    app = Application()
    app.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()


if __name__ == "__main__":
    main()
