FROM node:18

# Install DEB dependencies and others.
RUN  apt-get update \
	&& apt-get install -y net-tools build-essential python3 python3-pip valgrind

WORKDIR /service

COPY package.json .
COPY package-lock.json .
COPY . .
RUN rm -rf node_modules
RUN npm install
CMD ["npm", "run", "dev"]