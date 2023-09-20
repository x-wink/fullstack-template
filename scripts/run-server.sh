APP=personal-website
echo "尝试停止服务"
PID=$(ps -ef | grep node | grep $APP | awk '{print $2}')
if [ -z "${PID}" ]; then
	echo "服务没有运行"
else
	kill -9 $PID
	echo "服务停止成功："$PID
fi
MAIN=/apps/$APP/server/index.js
LOG=/apps/$APP/out.log
chmod a+x $MAIN
echo "开始启动服务"
nohup node --max-old-space-size=1024 $MAIN >$LOG 2>&1 &
echo "服务已启动"
