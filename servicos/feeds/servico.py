from flask import Flask, jsonify
import mysql.connector as mysql

servico = Flask(__name__)

IS_ALIVE = "yes"
DEBUG = True
TAMANHO_PAGINA = 4

MYSQL_SERVER = "mysql"
MYSQL_USER = "root"
MYSQL_PASS = "admin"
MYSQL_BANCO = "sua_receita"

def get_conexao_bd():
    conexao = mysql.connect(
        host=MYSQL_SERVER, user=MYSQL_USER, password=MYSQL_PASS, database=MYSQL_BANCO
    )

    return conexao

def gerar_feed(registro):
    feed = {
        "_id": registro["_id"],
        "category": {
            "name": registro["category_name"]
        },
        "product": {
            "name": registro["product_name"],
            "description": registro["description"]
        },
        "imagem" : registro["imagem"]
    }

    return feed

@servico.route("/isalive/")
def is_alive():
    return IS_ALIVE

@servico.route("/feeds/<int:pagina>/")
def get_feeds(pagina):
    feeds = []

    conexao = get_conexao_bd()
    cursor = conexao.cursor(dictionary=True)
    cursor.execute(
        "SELECT * FROM feeds "
        "order by datetime DESC " 
        "limit " + str((pagina - 1) * TAMANHO_PAGINA) + ", " + str(TAMANHO_PAGINA)
    )

    resultado = cursor.fetchall()

    for registro in resultado:
        feeds.append(gerar_feed(registro))

    return jsonify(feeds)

@servico.route("/feed/<int:feed_id>/")
def get_feed(feed_id):

    feeds = []

    conexao = get_conexao_bd()
    cursor = conexao.cursor(dictionary=True)
    cursor.execute(
        "SELECT * FROM feeds WHERE _id=" + str(feed_id)
    )
    registro = cursor.fetchone()

    feed = gerar_feed(registro)

    return jsonify(feed)



if __name__ == "__main__":
    servico.run(
        host="0.0.0.0",
        debug=DEBUG
    )


