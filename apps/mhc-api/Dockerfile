# This file is generated by Nx.
#
# Build the docker image with `npx nx docker-build mhc-api`.
# Tip: Modify "docker-build" options in project.json to change docker build args.
#
# Run the container with `docker run -p 3000:3000 -t mhc-api`.
FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system mhc-api && \
          adduser --system -G mhc-api mhc-api

COPY apps/mhc-api/dist mhc-api/
RUN chown -R mhc-api:mhc-api .

# You can remove this install step if you build with `--bundle` option.
# The bundled output will include external dependencies.
RUN npm --prefix mhc-api --omit=dev -f install

CMD [ "node", "mhc-api" ]
