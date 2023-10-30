FROM node:18-alpine AS builder

WORKDIR /usr/src/pni

COPY . .

RUN yarn install

RUN yarn build

FROM node:18-alpine
WORKDIR /usr/src/pni 

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /usr/src/pni/.next ./.next
COPY --from=builder /usr/src/pni/node_modules ./node_modules
COPY --from=builder /usr/src/pni/package.json ./package.json
COPY --from=builder /usr/src/pni/. .

USER nextjs

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["yarn", "start"]

