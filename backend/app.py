from flask import Flask
from flask import request
from flask import jsonify
from services.hpn_service import HPNService
from services.export_service import ExportService
from services.extraction_service import ExtractionService
from flask_cors import CORS
from services.network_service import NetworkService
from services.pdf_services import PDFService
from services.metrics_service import MetricsService
from services.simulation_service import SimulationService

app = Flask(__name__)

CORS(app)


@app.route("/upload-pdf", methods=["POST"])
def upload_pdf():

    if "file" not in request.files:
        return jsonify({
            "error": "No file"
        }), 400

    file = request.files["file"]

    path = f"uploads/{file.filename}"

    file.save(path)

    chunks = PDFService.extract(path)
    entities = ExtractionService.execute(chunks)
    hpn_matrix = HPNService.generate(
    chunks,
    entities
    )

    ExportService.export_hpn_csv(
        hpn_matrix
    )

    ExportService.export_hpn_json(
        hpn_matrix
    )
    graph = NetworkService.generate(
        hpn_matrix,
        entities
    )

    ExportService.export_graphml(
        graph
    )

    ExportService.export_graph_json(
        graph
    )
    metrics = MetricsService.generate(
    graph
    )

    ExportService.export_metrics_json(
        metrics
    )

    ExportService.export_metrics_csv(
        metrics
    )
    scenarios = SimulationService.generate(
        graph
    )

    ExportService.export_scenarios(
        scenarios
    )

    summary = {
        "actores": len(entities.get("actores", [])),
        "hechos": len(entities.get("hechos", [])),
        "pruebas": len(entities.get("pruebas", [])),
        "normas": len(entities.get("normas", []))
    }

    return jsonify({
        "success": True,
        "pages": len(chunks),
        "entities": entities,
        "hpn_matrix": hpn_matrix,
        "metrics": metrics,
        "scenarios": scenarios,
        "summary": summary
    })

@app.route("/network")
def get_network():

    import json

    with open(
        "outputs/network.json",
        "r",
        encoding="utf-8"
    ) as file:

        data = json.load(file)

    return jsonify(data)

@app.route("/metrics")
def get_metrics():

    import json

    with open(
        "outputs/metrics.json",
        "r",
        encoding="utf-8"
    ) as file:

        data = json.load(file)

    return jsonify(data)

@app.route("/scenarios")
def get_scenarios():

    import json

    with open(
        "outputs/scenarios.json",
        "r",
        encoding="utf-8"
    ) as file:

        data = json.load(file)

    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)

