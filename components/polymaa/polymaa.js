(function(){
	var meta;
	Polymer
	({
		aa: "",
		text:"",
		defaultAAset: 'default',
		observe: {
		  'aa': 'updateAA',
		  'text':'updateText'
		},

		ready: function() {
			if (!meta) {
				meta = document.createElement('core-meta');
			}
		},

		getAAset: function(name) {
			//console.log(meta, name);
			return meta.byId(name || this.defaultAAset);
		},

		updateAA: function(oldVal, newVal)
		{  
			var parts = String(this.aa).split(':');
			var aa = parts.pop();
			if (aa)
			{
				var set = this.getAAset(parts.pop());
				if (set)
				{
					this._aa = set.applyAA(this.shadowRoot, aa, this._text);
				}
			}
		},
		updateText: function(oldVal, newVal)
		{
			console.log(newVal);
			try{
				this._text = JSON.parse(newVal);
			}catch(e)
			{
				this._text = [newVal];
			}
			this.updateAA();
		}
	});
})();