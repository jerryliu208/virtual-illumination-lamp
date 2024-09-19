# 使用官方 Node.js 14 作為基礎鏡像
FROM node:14

# 設置工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json（如果存在）
COPY package*.json ./

# 安裝專案依賴
RUN npm install

# 複製專案文件到工作目錄
COPY . .

# 暴露 8080 端口
EXPOSE 8080

# 運行應用
CMD [ "npm", "run", "serve" ]