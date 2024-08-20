'use strict'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

// Add otel logging
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR); // set diaglog level to DEBUG when debugging

const exporterOptions = {
  url: 'https://ingest.[data_region].signoz.cloud:443/v1/traces', // Set your own data region or set to http://localhost:4318/v1/traces if using selfhost SigNoz
  headers: { 'signoz-access-token': 'SIGNOZ_INGESTION_KEY' }, // Set if you are using SigNoz Cloud
}

export const traceExporter = new OTLPTraceExporter(exporterOptions);