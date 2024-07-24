'use strict'
import process from 'process';
import {NodeSDK} from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { Resource } from '@opentelemetry/resources'
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions'
 
// Add otel logging when debugging
// import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
// diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const exporterOptions = {
  url: 'https://ingest.[data-region].signoz.cloud:443/v1/traces', // use your own data region or use http://localhost:8080 for self-hosted
  headers: { 'signoz-access-token': 'your-signoz-ingestion-key' }, // Use if you are using SigNoz Cloud
}

const traceExporter = new OTLPTraceExporter(exporterOptions);
const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
    resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: 'next-app',
  }),
});

// initialize the SDK and register with the OpenTelemetry API
// this enables the API to record telemetry
sdk.start()

// gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});