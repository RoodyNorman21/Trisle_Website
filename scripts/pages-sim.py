"""GH Pages-like static server: serves /foo -> foo.html (no redirect), then dir/index.html."""
import http.server
import os
import sys

ROOT = sys.argv[1] if len(sys.argv) > 1 else "."
PORT = int(sys.argv[2]) if len(sys.argv) > 2 else 4173


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def translate_path(self, path):
        clean = path.split("?", 1)[0].split("#", 1)[0]
        fs = super().translate_path(clean)
        if os.path.isdir(fs):
            idx = os.path.join(fs, "index.html")
            if os.path.exists(idx):
                return fs if clean.endswith("/") else fs  # serve dir -> index via send_head
            html = fs.rstrip("/") + ".html"
            if os.path.exists(html):
                return html
        elif not os.path.exists(fs):
            html = fs + ".html"
            if os.path.exists(html):
                return html
        return fs

    def send_head(self):
        # Serve directory index.html directly without the 301 redirect dance
        clean = self.path.split("?", 1)[0].split("#", 1)[0]
        fs = super().translate_path(clean)
        if os.path.isdir(fs) and os.path.exists(os.path.join(fs, "index.html")):
            return super().send_head()
        return super().send_head()

    def log_message(self, *a):
        pass


if __name__ == "__main__":
    http.server.ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
