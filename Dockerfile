# Use a compatible Node.js version with Cypress
FROM cypress/included:13.9.0

# Ensure system is updated
RUN apt-get update && apt-get install -y curl

# Install a compatible Node.js & NPM version
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm@10

# Enable Corepack (Yarn & PNPM)
RUN corepack enable && corepack prepare yarn@stable --activate

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the full project
COPY . .

# Ensure Cypress binary is installed
RUN npx cypress verify

# Run Cypress tests
CMD ["npx", "cypress", "run"]
