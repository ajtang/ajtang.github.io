(function intiate(){

   if (window.hasOwnProperty("JustWatch")) {
    console.log('There already is a globally defined variable with the name "JustWatch"')
    ///delete window.JustWatch
    }
   // Variables
    const widgetHost = "https://widget.justwatch.com"
    let iframeIndex = 0

    // For more convenient reloading of widgets, make initializeWidgets available globally.
    window.JustWatch = {
        reloadWidgets: initializeWidgets
    }
    
    // Initialize widgets
    initializeWidgets()

    function initializeWidgets() {
        let nodeSelection = document.querySelectorAll('[data-jw-widget]')
        if (nodeSelection.length < 1) {
            // Legacy fallback
            nodeSelection = document.querySelectorAll(".justwatch-widget")
        }
    
       if (nodeSelection.length < 1) {
            console.log("Couldn't find JustWatch widget element.")
            return
        }  
        nodeSelection.forEach(function(widgetEl) {
            // The stringified index is used to identify the iframes.
            // It's put into the url query params of the src attribute of the iframe.
            // The widget in the iframe is required to identify with its key on each resize.
            var
			iframeKey = iframeIndex + ""
            iframeIndex++
    
            var queryParams = {
                iframe_key: iframeKey,
                language: (window.navigator.userLanguage || window.navigator.languages[0] || window.navigator.language || "").slice(0, 2)
            }

            let appendIframe
            
            // Add data attributes to query params
            for (let i = 0; i < widgetEl.attributes.length; i++) {
                var attr = widgetEl.attributes[i]
                if (!attr.nodeName.startsWith("data-")) {
                    continue
                }
                if (attr.nodeName === "data-jw-widget") {
                    continue
                }
                if (attr.nodeName === "data-append-iframe") {
                    appendIframe = true
                    continue
                }
    
                queryParams[attr.nodeName.slice(5).replace(/-/g, "_")] = attr.nodeValue
            }
    
            // Format query params as string
            var queryParamString = Object.keys(queryParams)
                .map(key => {
                    return encodeURIComponent(key) + "=" + encodeURIComponent(queryParams[key])
                })
                .join("&")
    
            // Create iframe and replace the widget element with it
            var widgetIframe = document.createElement("iframe")
            widgetIframe.src = widgetHost + "/inline_widget?" + queryParamString
            widgetIframe.className = "jw-widget-iframe"
            widgetIframe.width = "100%"
            widgetIframe.height = "2px"
            widgetIframe.style.borderRadius = "4px"
            widgetIframe.frameBorder = "0"
			//widgetIframe.style.position = "relative"
			

            if (appendIframe) {
                const children = widgetEl.children
                for (let i = 0; i < children.length; i++) {
                    if (children[i].className.indexOf("jw-widget-iframe") > -0.5) {
                        widgetEl.removeChild(children[i])
                    }
                }
                widgetEl.appendChild(widgetIframe)
            } else {
                widgetEl.parentElement.replaceChild(widgetIframe, widgetEl)
            }
            
            // Add resize event listener
            window.addEventListener("message", onWidgetResize, false)
    
            // onWidgetResize handles messages from within the iframe.
            function onWidgetResize(event) {
                if (!event.data.hasOwnProperty("sender")) {
                    return
                }
                if (event.data.sender !== "jw_widget") {
                    return
                }
                if (event.data.key !== iframeKey) {
                    return
                }
                
                widgetIframe.height = event.data.cssHeight
            }
        })
    }
})()