#!/usr/bin/env bash

BASE_URL="http://localhost:${PORT:-3000}"

echo "Create note 1"
curl -s -i -X POST "$BASE_URL/notes" -H "Content-Type: application/json" -d '{"title":"First","content":"Hello"}'
echo

echo "Create note 2"
curl -s -i -X POST "$BASE_URL/notes" -H "Content-Type: application/json" -d '{"title":"Second","content":"World"}'
echo

echo "List all notes"
curl -s -i "$BASE_URL/notes"
echo

echo "Get note 1"
curl -s -i "$BASE_URL/notes/1"
echo

echo "Update note 1"
curl -s -i -X PUT "$BASE_URL/notes/1" -H "Content-Type: application/json" -d '{"title":"First edited","content":"Updated"}'
echo

echo "Delete note 2"
curl -s -i -X DELETE "$BASE_URL/notes/2"
echo

echo "Get deleted note 2 (404)"
curl -s -i "$BASE_URL/notes/2"
echo

echo "Send invalid note (400)"
curl -s -i -X POST "$BASE_URL/notes" -H "Content-Type: application/json" -d '{}'
echo
