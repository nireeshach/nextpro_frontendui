import os

import falcon
from falcon_multipart.middleware import MultipartMiddleware
from falcon.http_status import HTTPStatus
from falcon_cors import CORS

BASE_DIR = os.getcwd()
STATIC_DIR = os.path.join(BASE_DIR, "static")
public_cors = CORS(allow_all_origins=True)


class HandleCORS(object):
    def process_request(self, req, resp):
        resp.set_header("Access-Control-Allow-Origin", "*")
        resp.set_header("Access-Control-Allow-Methods", "*")
        resp.set_header("Access-Control-Allow-Headers", "*")
        resp.set_header("Access-Control-Max-Age", 1728000)  # 20 days
        if req.method == "OPTIONS":
            raise HTTPStatus(falcon.HTTP_200, body="\n")


class HomePage(object):
    cors = public_cors

    def on_get(self, req, resp):
        """Handles GET requests"""
        resp.status = falcon.HTTP_200
        resp.content_type = "text/html"
        with open("index.html", "r") as f:
            resp.body = f.read()


# Falcon application object
app = falcon.API(middleware=[MultipartMiddleware(), HandleCORS()])

# Route to serve the resources
app.add_static_route("/static", STATIC_DIR)
app.add_route("/", HomePage())
