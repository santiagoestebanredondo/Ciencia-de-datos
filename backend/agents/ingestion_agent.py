import fitz
import hashlib

class IngestionAgent:

    def process_pdf(self, pdf_path):

        doc = fitz.open(pdf_path)

        chunks = []

        for page_num in range(len(doc)):

            page = doc.load_page(page_num)

            text = page.get_text()

            chunk_hash = hashlib.sha256(
                text.encode("utf-8")
            ).hexdigest()

            chunks.append({
                "page": page_num + 1,
                "text": text,
                "hash": chunk_hash
            })

        return chunks