from flask import Flask, render_template, redirect, url_for, request
import random
import json


app = Flask(__name__)
app.config['DEBUG'] = True
app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/')
def index():
    return redirect(url_for('base'))

@app.route('/base')
def base():
    return render_template('base.html')


if __name__ == '__main__':
   app.run(debug=True, port=5000)
   
