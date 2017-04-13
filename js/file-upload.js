
$(function() {
	if ($('.ajax-file-upload-abort:visible').length > 0){
		$('.custom-delete').hide();		
	} else {
		$('.custom-delete').show();
	}
});

$(document).ready(function() {

	var getFileUploaderObject = function() {
		return {
			url:"php/upload.php",
			multiple:true,
			dragDrop:false,
			uploadStr:getString('buscar-archivo'),
			showDelete: true,
			fileName:"myfile",
			deleteCallback: function (data, pd) {
				data = data.replace('[\"', '');
				data = data.replace('\"]', '');
		        $.post("php/delete.php", {op: "delete",name: data},
		            function (resp,textStatus, jqXHR) {
		                if (resp=='emptyFolder'){
		    				pd.statusbar.hide();            	
		                }	
		            });

			},
			customProgressBar: function(obj,s)
				{
					this.statusbar = $("<div class='file-upload-statusbar'></div>");
		            this.filename = $("<div class='ajax-file-upload-filename'></div>").appendTo(this.statusbar);
		            this.progressDiv = $("<div class='ajax-file-upload-progress'>").appendTo(this.statusbar).hide();
		            this.progressbar = $("<div class='ajax-file-upload-bar'></div>").appendTo(this.progressDiv);
		            this.abort = $("<div>" + getString('abortar') + "</div>").appendTo(this.statusbar).hide();
		            this.cancel = $("<div>X</div>").appendTo(this.statusbar).hide();
		            this.done = $("<div>" + s.doneStr + "</div>").appendTo(this.statusbar).hide();
		            this.download = $("<div>" + s.downloadStr + "</div>").appendTo(this.statusbar).hide();
		            this.del = $("<div>X</div>").appendTo(this.statusbar).hide();
		            
		            this.abort.addClass("custom-red");
		            this.done.addClass("custom-green");
					this.download.addClass("custom-green");            
		            this.cancel.addClass("custom-red");
		            this.del.addClass("custom-delete");
					return this;
					
				}	
		};
	}

	$("#fileuploader").uploadFile(getFileUploaderObject());
	$("#fileuploader1").uploadFile(getFileUploaderObject());
	$("#fileuploader2").uploadFile(getFileUploaderObject());
	$("#fileuploader3").uploadFile(getFileUploaderObject());
});