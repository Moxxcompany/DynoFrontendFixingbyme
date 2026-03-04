import os
from fastapi import FastAPI, Request
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

NEXTJS_URL = "http://localhost:3000"


@app.api_route("/api/auth/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"])
async def proxy_nextauth(path: str, request: Request):
    target_url = f"{NEXTJS_URL}/api/auth/{path}"
    query_string = str(request.query_params)
    if query_string:
        target_url += f"?{query_string}"

    headers = dict(request.headers)
    headers.pop("host", None)
    headers.pop("Host", None)

    body = await request.body()

    async with httpx.AsyncClient(follow_redirects=False, timeout=30.0) as client:
        resp = await client.request(
            method=request.method,
            url=target_url,
            headers=headers,
            content=body,
        )

    response_headers = dict(resp.headers)
    response_headers.pop("content-encoding", None)
    response_headers.pop("content-length", None)
    response_headers.pop("transfer-encoding", None)

    return Response(
        content=resp.content,
        status_code=resp.status_code,
        headers=response_headers,
    )


@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "dynopay-proxy"}


@app.api_route("/api-status", methods=["GET"])
async def proxy_api_status(request: Request):
    """Proxy /api-status to Next.js frontend (K8s routes /api* to backend)"""
    target_url = f"{NEXTJS_URL}/api-status"
    query_string = str(request.query_params)
    if query_string:
        target_url += f"?{query_string}"

    headers = dict(request.headers)
    headers.pop("host", None)
    headers.pop("Host", None)

    async with httpx.AsyncClient(follow_redirects=True, timeout=30.0) as client:
        resp = await client.request(
            method=request.method,
            url=target_url,
            headers=headers,
        )

    response_headers = dict(resp.headers)
    response_headers.pop("content-encoding", None)
    response_headers.pop("content-length", None)
    response_headers.pop("transfer-encoding", None)

    return Response(
        content=resp.content,
        status_code=resp.status_code,
        headers=response_headers,
    )
