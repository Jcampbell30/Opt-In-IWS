import azure.functions as func
import logging
import json
import pyodbc

app = func.FunctionApp(http_auth_level=func.AuthLevel.FUNCTION)

@app.route(route="http_submit_opt_in")
def http_submit_opt_in(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    name = req.params.get('name')
    if not name:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            name = req_body.get('name')

    if name:
        response = {
            "message": f"Hello, {name}. This HTTP triggered function executed successfully."
        }
    else:
        response = {
            "message": "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response."
        }

    return func.HttpResponse(
        json.dumps(response),
        mimetype="application/json",
        status_code=200
    )

@app.route(route="open_db_connection")
def open_db_connection(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function to open DB connection processed a request.')

    try:
        # Update with your actual connection string
        conn_str = "endpoint=https://acs-inglewebapp2.unitedstates.communication.azure.com/"
        conn = pyodbc.connect(conn_str)
        cursor = conn.cursor()
        cursor.execute("SELECT @@VERSION;")
        row = cursor.fetchone()
        response = {
            "message": "Database connection opened successfully.",
            "db_version": row[0]
        }
        conn.close()
    except Exception as e:
        logging.error(f"Error opening database connection: {e}")
        response = {
            "message": "Failed to open database connection.",
            "error": str(e)
        }

    return func.HttpResponse(
        json.dumps(response),
        mimetype="application/json",
        status_code=200
    )