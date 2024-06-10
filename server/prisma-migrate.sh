#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Determine the environment (default to development if not set)
ENVIRONMENT=${NODE_ENV:-development}

# Paths to schema files
SCHEMA_DEV="prisma/schema.dev.prisma"
SCHEMA_PROD="prisma/schema.prod.prisma"

# Function to select the appropriate schema file based on the environment
select_schema() {
  if [ "$ENVIRONMENT" = "production" ]; then
    SCHEMA=$SCHEMA_PROD
    export DATABASE_URL=$DATABASE_URL_PROD
    export DATABASE_PROVIDER=$DATABASE_PROVIDER_PROD
  else
    SCHEMA=$SCHEMA_DEV
    export DATABASE_URL=$DATABASE_URL_DEV
    export DATABASE_PROVIDER=$DATABASE_PROVIDER_DEV
  fi
  echo "Using schema file: $SCHEMA"
}

# Function to run Prisma commands with the selected schema
run_prisma_command() {
  COMMAND=$1
  select_schema

  echo "Running: npx prisma $COMMAND --schema=$SCHEMA"
  npx prisma $COMMAND --schema=$SCHEMA
}

# Main function to handle script arguments
main() {
  case "$1" in
    migrate)
      ACTION=$2
      run_prisma_command "migrate $ACTION"
      ;;
    generate)
      run_prisma_command "generate"
      ;;
    *)
      echo "Usage: $0 {migrate [dev|deploy|status|reset|resolve]|generate}"
      exit 1
  esac
}

# Run the main function with script arguments
main "$@"
