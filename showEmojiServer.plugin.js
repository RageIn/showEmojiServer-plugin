//META{"name":"showEmojiServer"}*//



/*TODO:
//(x) when hover over $(".emoji") add text to $(".tooltip")
//(x) index all emoji's in users servers (map (url,server))
//(x) when user hovers over emoji in message search emoji map using url as key and return server
//(x) show server in tooltip
//( ) load emoji's when discord starts in friends screen (on load click first server)
*/
class showEmojiServer {
	constructor(){
		this.emoteServer = {};
		this.emojiMap = new Map();
	}
	
	start(){
		var emojiMap = this.emojiMap;
		this.hoverEmoji();
		
		$('.channel-textarea-emoji').trigger("click");
		setTimeout(function(){$('#bda-qem-emojis').trigger("click");}, 500);
		var height = $('.emoji-picker .scroller-wrap .scroller>div:last-child').height();
		console.log("height " + height);
		setTimeout(function(){$('.emoji-picker .scroller').css("height",height);}, 1000);
		setTimeout(function(){$('.categories .custom').trigger("click");}, 2000);
		setTimeout(function(){
			console.log("loading Emojis");
			var currentServer = "";
			$('.emoji-picker .scroller-wrap .scroller>div').each(function(){
				if(!$(this).length){
					console.log("error element dne");
					return;
				}
				if($(this).hasClass("category")) currentServer = $(this).text();
				console.log("currentServer: " + currentServer);
				if($(this).hasClass("row") && currentServer != "Frequently Used"){
					$(this).children().each(function(){
						let bg = $(this).css("background-image");
						bg = bg.replace('url(','').replace(')','').replace(/\"/gi, "");
						emojiMap.set(bg, currentServer);
						console.log("mapping: " + bg + ", " + currentServer);
					});
				}
			});
			$('.channel-textarea-emoji').trigger("click");	
		}, 4000);
	}
	
	stop(){
	}
	
	getName(){
		return "Show Emoji Server";
	}
	
	getDescription(){
		return "Displays an emoji's server when hovered over. The plugin must load while currently in any server or dm (not friends list), if the plugin does not load properly reload discord (ctrl+r) while in a server or dm thread.";
	}
	
	getVersion(){
		return "0.1.0";
	}
	
	getAuthor(){
		return "kdubious";
	}	

	load(){}

	unload(){}

    //called when a message is received
	onMessage(){
	}

    //called when a server or channel is switched
	onSwitch(){}
	
    //raw MutationObserver event for each mutation
	observer(e){
		
		var elem = e.addedNodes[0];
		var removed = e.removedNodes[0];
		
		if($(elem).find('.emoji')){
			this.hoverEmoji();
		}
		
		if($(elem).hasClass("tooltip")){
			$('<span><br/>' + this.emoteServer.server +'</span>').appendTo('.tooltip');
		}
	}

	getSettingsPanel(){}

	hoverEmoji(){
		var emojiMap = this.emojiMap;
		var emoteServer = this.emoteServer;
		
		$(".emoji").hover(
			function(){
				var key = $(this).attr('src');
				if(emojiMap.has(key)){
					emoteServer.server = emojiMap.get(key);
				}
			},
			function(){
				emoteServer.server = "";
			}
		);
	}
	
}