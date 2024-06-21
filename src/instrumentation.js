/*instrumentation.js*/
// Require dependencies
const { NodeSDK } = require('@opentelemetry/sdk-node');
//const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');

const {
  OTLPTraceExporter,
} = require('@opentelemetry/exporter-trace-otlp-proto');

const sdk = new NodeSDK({
  //traceExporter: new ConsoleSpanExporter(),
  traceExporter: new OTLPTraceExporter({
    // optional - default url is http://localhost:4318/v1/traces
    url: 'http://localhost:9411/v1/traces',
    // optional - collection of custom headers to be sent with each request, empty by default
    headers: {},
  }), 
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

