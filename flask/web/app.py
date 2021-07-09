from flask import Flask, jsonify, request, json
from flask.globals import session
from flask_mysqldb import MySQL
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token

app = Flask(__name__)


# configure db
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '123456789'
app.config['MYSQL_DB'] = 'pythonlogin'
app.config['JWT_SECRET_KEY'] = 'secret'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)


@app.route('/')
def index():
    return "Hello"


@app.route('/users/register', methods=['POST'])
def register():
    cur = mysql.connection.cursor()
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(
        request.get_json()['password']).decode('utf-8')
    created = datetime.utcnow()
    cur.execute("INSERT INTO users (first_name, last_name, email, password, created) VALUES ('" +
                str(first_name) + "', '" +
                str(last_name) + "', '" +
                str(email) + "', '" +
                str(password) + "', '" +
                str(created) + "')")
    mysql.connection.commit()
    result = {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "password": password,
        "created": created
    }

    return jsonify({"result": result})


@app.route('/users/members', methods=['POST'])
def members():
    cur = mysql.connection.cursor()
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()['email']
    number = request.get_json()['number']
    birthday = request.get_json()['birthday']
    address = request.get_json()['address']
    created = datetime.utcnow()
    cur.execute("INSERT INTO members (first_name, last_name, email, number, birthday, address , created) VALUES ('" +
                str(first_name) + "', '" +
                str(last_name) + "', '" +
                str(email) + "', '" +
                str(number) + "', '" +
                str(birthday) + "', '" +
                str(address) + "', '" +
                str(created) + "')")
    mysql.connection.commit()
    result = {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "number": number,
        "birthday": birthday,
        "address": address,
        "created": created
    }

    return jsonify({"result": result})


@app.route('/users/login', methods=['POST'])
def login():
    cur = mysql.connection.cursor()
    email = request.get_json()['email']
    password = request.get_json()['password']

    result = ""

    cur.execute("SELECT * FROM users WHERE email = '" + str(email) + "'")
    rv = cur.fetchone()

    if bcrypt.check_password_hash(rv['password'], password):
        access_token = create_access_token(identity={
            'first_name': rv['first_name'],
            'last_name': rv['last_name'],
            'email': rv['email']
        })
        result = jsonify({"token": access_token})
    else:
        result = jsonify({"error": "Invalid username or password"})
    return result


@app.route('/admin', methods=['GET'])
def admin():
    cur = mysql.connection.cursor()
    cur.execute("select * from users")
    rs = cur.fetchall()
    rt = []
    for i in rs:
        rt.append(i)

    return jsonify(rt)


@app.route('/shows', methods=['GET', 'POST'])
def shows():
    cur = mysql.connection.cursor()
    cur.execute("select * from members")
    rs = cur.fetchall()
    rt = []
    for i in rs:
        rt.append(i)

    return jsonify(rt)


@app.route('/shows/delete/<id>', methods=['POST'])
def delete(id):
    cur = mysql.connection.cursor()
    cur.execute('delete from members where id=' + id)
    mysql.connection.commit()
    return jsonify({'result': True})


@app.route('/shows/add/<id>', methods=['POST'])
def add(id):
    cur = mysql.connection.cursor()
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()['email']
    number = request.get_json()['number']
    birthday = request.get_json()['birthday']
    address = request.get_json()['address']
    created = datetime.utcnow()
    cur.execute("UPDATE members (first_name, last_name, email, number, birthday, address) VALUES ('" +
                str(first_name) + "', '" +
                str(last_name) + "', '" +
                str(email) + "', '" +
                str(number) + "', '" +
                str(birthday) + "', '" +
                str(address) + "') WHERE id=" + id)
    mysql.connection.commit()
    result = {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "number": number,
        "birthday": birthday,
        "address": address,
        "created": created
    }

    return jsonify({"result": result})


@app.route('/perfumes', methods=['GET', 'POST'])
def perfumes():
    cur = mysql.connection.cursor()
    cur.execute("select * from nuochoa")
    rs = cur.fetchall()
    rt = []
    for i in rs:
        rt.append(i)

    return jsonify(rt)


@app.route('/all', methods=['GET', 'POST'])
def all():
    cur = mysql.connection.cursor()
    cur.execute("select nuochoa.tennuochoa,loai.tenloai,nuochoa.xuatxu,giatien.gia from((nuochoa inner join loai on nuochoa.maloai = loai.maloai) inner join giatien on nuochoa.manuochoa = giatien.manuochoa)")
    rs = cur.fetchall()
    rt = []
    for i in rs:
        rt.append(i)

    return jsonify(rt)


@app.route('/types', methods=['GET', 'POST'])
def types():
    cur = mysql.connection.cursor()
    cur.execute("select * from loai")
    rs = cur.fetchall()
    rt = []
    for i in rs:
        rt.append(i)

    return jsonify(rt)


@app.route('/moneys', methods=['GET', 'POST'])
def moneys():
    cur = mysql.connection.cursor()
    cur.execute("select * from giatien")
    rs = cur.fetchall()
    rt = []
    for i in rs:
        rt.append(i)

    return jsonify(rt)


if __name__ == '__main__':
    app.run(debug=True)
