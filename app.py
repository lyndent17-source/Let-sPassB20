from flask import Flask, render_template, redirect, url_for, request, session
import sqlite3

app = Flask(__name__)
app.secret_key = "my_secret_key"


@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        if username and password:
            session["username"] = username
            return redirect(url_for("home"))

    return render_template("login_page.html")


@app.route("/home")
def home():
    if "username" not in session:
        return redirect(url_for("login"))
    return render_template("home_page.html")


@app.route("/html-review")
def html_review():
    if "username" not in session:
        return redirect(url_for("login"))
    return render_template("html_review.html")


@app.route("/html-quiz")
def html_quiz():
    if "username" not in session:
        return redirect(url_for("login"))
    return render_template("html_quiz.html")


@app.route("/css-review")
def css_review():
    if "username" not in session:
        return redirect(url_for("login"))
    return render_template("css_review.html")


@app.route("/css-quiz")
def css_quiz():
    if "username" not in session:
        return redirect(url_for("login"))
    return render_template("css_quiz.html")

@app.route("/javascript-review")
def javascript_review():
    if "username" not in session:
        return redirect(url_for("login"))
    return render_template("javascript_review.html")


@app.route("/javascript-quiz")
def javascript_quiz():
    if "username" not in session:
        return redirect(url_for("login"))
    return render_template("javascript_quiz.html")


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))


if __name__ == "__main__":
    app.run(debug=True)
