from fastapi import FastAPI, Request, UploadFile, File
from fastapi import FastAPI
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import requests
from sqlalchemy import select
from backend.config import configure_cors
from backend.database import async_session
from backend.database import Product


app = FastAPI()
configure_cors(app)


templates = Jinja2Templates(directory="templates")
from fastapi.responses import JSONResponse

from sqlalchemy import desc

@app.get("/news/products_1")
async def get_product_names():
    async with async_session() as session:
        # Truy vấn lấy tên 3 sản phẩm có id lớn nhất
        result = await session.execute(
            select(Product.id, Product.name, Product.url, Product.content, Product.created_at, Product.category)
            .order_by(Product.id.desc())  # sắp xếp giảm dần theo id
            .limit(3)                     # lấy 3 bản ghi
        )
        products = [
            {
                "id": row[0],
                "name": row[1],
                "url": row[2],
                "content": row[3],
                "created_at": row[4].strftime("%d/%m/%Y"),
                "category": row[5]
            }
            for row in result.all()
        ]
    return {"products": products}

@app.get("/news/products_2")
async def get_product_names():
    async with async_session() as session:
        # Truy vấn lấy tên 3 sản phẩm có id lớn nhất
        result = await session.execute(
            select(Product.id, Product.name, Product.url_image, Product.content, Product.created_at, Product.category)
            .order_by(Product.id.desc())  # sắp xếp giảm dần theo id
        )
        products = [
            {
                "id": row[0],
                "name": row[1],
                "image_url": row[2],
                "content": row[3],
                "created_at": row[4].strftime("%d/%m/%Y"),
                "category": row[5]
            }
            for row in result.all()
        ]
    return {"products": products}

# tìm kiếm theo điều kiện "category"

from fastapi import Query

@app.get("/news/products_3")
async def get_product_names(category: str = Query(default=None)):
    async with async_session() as session:
        stmt = select(
            Product.id,
            Product.name,
            Product.url_image,
            Product.content,
            Product.created_at,
            Product.category
        ).order_by(Product.id.desc())

        # Nếu có truyền category và category không phải là "All"
        if category and category.lower() != "All":
            stmt = stmt.where(Product.category == category)

        result = await session.execute(stmt)

        products = [
            {
                "id": row[0],
                "name": row[1],
                "image_url": row[2],
                "content": row[3],
                "created_at": row[4].strftime("%d/%m/%Y"),
                "category": row[5]
            }
            for row in result.all()
        ]

    return {"products": products}


@app.get("/api/products")
async def get_all_products():
    async with async_session() as session:
        result = await session.execute(
            select(Product.id, Product.name, Product.url_image, Product.content)
        )
        products = [
            {
                "id": row[0],
                "name": row[1],
                "image_url": row[2],
                "content": row[3]
            }
            for row in result.all()
        ]
    return {"products": products}

@app.get("/api/products/{product_id}")
async def get_product_by_id(product_id: int):
    async with async_session() as session:
        result = await session.execute(
            select(Product.id, Product.name, Product.url_image, Product.content)
            .where(Product.id == product_id)
        )
        product = result.first()
        
        if product:
            return {
                "id": product[0],
                "name": product[1],
                "image_url": product[2],
                "content": product[3]
            }
        return {"error": "Product not found"}

@app.get("/", response_class=HTMLResponse)
async def serve_frontend(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/product/{product_id}", response_class=HTMLResponse)
async def serve_product_page(request: Request, product_id: int):
    return templates.TemplateResponse("product_detail.html", {"request": request, "product_id": product_id})
