from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import UJSONResponse

import os
import json
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000",
    "http://localhost:5020",
    "localhost:5020"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class Item(BaseModel):
    name: str
    content: str

class JsonContent:
    def __init__(self, folder, module):
        self.folder = folder
        self.module = module

    def readJsonContent(self):
        filename = "./" + self.folder + "/configs/" + self.module
        f = open(filename, "r")
        contents = f.read()
        f.close()
        self.content = contents

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to Json Generator."}


@app.get("/jsonlist/{folder}", tags=["jsonconfigs"])
async def read_root(folder : str) -> dict:
    try:
        entries = os.listdir(folder + '/configs/')
        items  = []
        for entry in entries:
            item = JsonContent(folder, entry)
            item.readJsonContent()
            items.append(item)

        return {
            "success": "true",
            "data": items #entries
        }
    except:
        return {
            "success": "false"
        }

@app.get("/jsonlist/{folder}/{module}", tags=["jsonconfigs"])
async def read_json_file(folder : str, module : str) -> dict:
    filename = "./" + folder + "/configs/" + module
    f = open(filename, "r")
    contents = f.read()
    f.close()
    return {
        "success": "true",
        "data": contents
    }

@app.put("/jsonlist/{folder}/{module}", tags=["jsonconfigs"])
async def update_json_file(folder : str, module : str, item : Item):
    filename = "./" + folder + "/configs/" + module
    f = open(filename, "w+")
    f.write(item.content)
    f.close()
    return {
        "success": "true",
        "data": item.content
    }


############FROM Grocery
@app.get("/list", tags=["grocery"])
async def get_list_items():
    filename = "./data/db.json"
    f = open(filename, "r")
    contents = f.read()
    f.close()
    y = json.loads(contents)
    return y["list"]

@app.get("/list/{itemFind}", tags=["grocery"])
async def get_list_item(itemFind : str):
    filename = "./data/db.json"
    f = open(filename, "r")
    contents = f.read()
    f.close()
    items = json.loads(contents)
    for item in items["list"]:
        if item["item"] == itemFind:
            return item

    return None

from pydantic import BaseModel

class Item(BaseModel):
    item: str

@app.post("/list")
async def create_item(itemPost: Item):
    try:
        filename = "./data/db.json"
        f = open(filename, "r")
        contents = f.read()
        f.close()
        items = json.loads(contents)
        items["list"].append({ "id": 4, "item": itemPost.item})
        f = open(filename, "r")
        f.write(json.dumps(items))
        f.close()
        return itemPost
    except:
        return None