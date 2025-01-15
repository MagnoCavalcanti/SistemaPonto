from fastapi import FastAPI


app = FastAPI()

@app.get('/test')
def teste_endpoint():
    return {'msg': 'sucess'}

