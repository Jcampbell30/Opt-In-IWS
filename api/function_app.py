import azure.functions as func
import logging
import json

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