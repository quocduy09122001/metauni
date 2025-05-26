from fastapi.middleware.cors import CORSMiddleware

# Add CORS middleware to allow frontend to access API
def configure_cors(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )