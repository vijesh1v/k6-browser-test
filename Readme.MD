steps require
------------------
winget install k6
K6_BROWSER_HEADLESS=false k6 run browser-test.js (for headed mode)
k6 run browser-test.js (headless mode)
-------------------

not required now
go install go.k6.io/xk6/cmd/xk6@latest
xk6 build --output xk6-browser --with github.com/grafana/xk6-browser

