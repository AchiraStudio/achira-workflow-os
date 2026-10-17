---
name: ai-expert
description: Master rules for building AI-native applications, RAG pipelines, and LLM integrations.
version: 1.0
---

# 🤖 AI & RAG Expert Core Rules

This skill provides architectural guidance for integrating Large Language Models (LLMs) and building Retrieval-Augmented Generation (RAG) systems.

## 1. LLM Integration Patterns

- **Provider Abstraction**: Never tightly couple to a single provider (e.g., OpenAI, Anthropic). Use abstraction layers or libraries like LangChain/LlamaIndex (Python) or AI SDK (TypeScript/Next.js).
- **Streaming Responses**: Always utilize response streaming (`stream: true`) to minimize perceived latency for the user.
- **Failovers & Retries**: Implement exponential backoff for rate limits (429s) and fallback models if the primary provider goes down.
- **Structured Outputs**: Force LLMs to return structured data (JSON) using Function Calling or strict Prompt Engineering (e.g., "Return ONLY valid JSON").

## 2. RAG Architecture (Retrieval-Augmented Generation)

- **Embedding Models**: Choose the right embedding model (e.g., text-embedding-3-small) based on the specific modality and dimension requirements of your vector database.
- **Vector Databases**: Use managed vector stores (Pinecone, Supabase pgvector, Weaviate) for scalable similarity search.
- **Chunking Strategy**: Do not chunk blindly. Use semantic chunking or recursive character splitting with generous overlap (~10-20%) to preserve context.
- **Hybrid Search**: Implement hybrid search (Keyword + Dense Vector Search + Reranking) for the highest retrieval accuracy.

## 3. Prompt Engineering

- **Systematic Structure**: Structure prompts with clear `<roles>`, `<context>`, `<instructions>`, and `<output_format>`.
- **Few-Shot Prompting**: Provide 2-3 concrete examples of desired input/output pairs to drastically increase accuracy.
- **Context Windows**: Be mindful of token limits. Dynamically trim or summarize the conversation history before sending it to the LLM.

## 4. AI Security & Ethics

- **Prompt Injection Defense**: Validate and sanitize user inputs before appending them as context. Use structural delimiters (e.g., "USER INPUT BEGINS HERE").
- **Cost Management**: Cache identical prompt responses and track token usage aggressively on the backend.
