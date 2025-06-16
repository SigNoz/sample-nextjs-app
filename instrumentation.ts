import { registerOTel, OTLPHttpJsonTraceExporter } from '@vercel/otel';
// Add otel logging
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR); // set diaglog level to DEBUG when debugging

export function register() {
  registerOTel({
    serviceName: 'your-project-name',
    traceExporter: new OTLPHttpJsonTraceExporter({
        url: 'https://ingest.<region>.signoz.cloud:443/v1/traces', // Set your own data region or set to http://localhost:4318/v1/traces if using selfhost SigNoz
        headers: { 'signoz-ingestion-key': '<SigNoz-ingestion-key>' }, // Set only if you are using SigNoz Cloud
    }),
  });
}