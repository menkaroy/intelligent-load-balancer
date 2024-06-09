function handleRESTRequest(payload, res) {
  // Simulate REST API handling
  res.send("Handled REST API Request");
}

function handleGraphQLRequest(payload, res) {
  // Simulate GraphQL API handling
  res.send("Handled GraphQL API Request");
}

function handleGRPCRequest(payload, res) {
  // Simulate gRPC API handling
  res.send("Handled gRPC API Request");
}

function handleFastResponse(res) {
  setTimeout(() => res.send("Fast response"), 100);
}

function handleSlowResponse(res) {
  setTimeout(() => res.send("Slow response"), 1000);
}

module.exports = {
  handleRESTRequest,
  handleGraphQLRequest,
  handleGRPCRequest,
  handleFastResponse,
  handleSlowResponse,
};
