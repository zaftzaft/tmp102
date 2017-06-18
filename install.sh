cp tmp102.js /opt/tmp102.js

cp tmp102.service /usr/lib/systemd/system/tmp102.service
cp tmp102.timer /usr/lib/systemd/system/tmp102.timer

systemctl daemon-reload
systemctl enable tmp102.timer
systemctl start tmp102.timer


