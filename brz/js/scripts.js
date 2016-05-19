
function cImage(source, width, height)
{
	this._Source = source;
	this._Width = width;
	this._Height = height;
}
cImage.CreateNewInstanceBySource = function(source) 
{
	return new cImage(source, 4608, 3072);
};
cImage.CreateNewInstanceBySourceWidthAndHeight = function(source, width, height) 
{
	return new cImage(source, width, height);
};

function cImageList(ImageList) 
{
    this._ImageList = ImageList;
}
cImageList.prototype.GetImageByName = function(ImageName) 
{
	for(var ii = 0; ii < this._ImageList.length; ii++)
	{
		if(this._ImageList[ii]._Source = ImageName)
		{
			return this._ImageList[ii];
		}
	}
	return null;
};

var imageList = new cImageList
(
	new Array
	(
		new cImage.CreateNewInstanceBySourceWidthAndHeight('005-front_left_6.jpg', 		3751, 2500),
		new cImage.CreateNewInstanceBySourceWidthAndHeight('003-front_3_Not.jpg', 		3296, 2026),
		new cImage.CreateNewInstanceBySourceWidthAndHeight('002-front_right_1.jpg', 	4102, 2733),
		new cImage.CreateNewInstanceBySourceWidthAndHeight('011.jpg', 					4003, 2665),
		new cImage.CreateNewInstanceBySourceWidthAndHeight('015-inside_front_4.jpg', 	4608, 3072),

		new cImage.CreateNewInstanceBySourceWidthAndHeight('007-rear_left.jpg', 		3860, 2574),
		new cImage.CreateNewInstanceBySourceWidthAndHeight('002-front_right_2.jpg', 	4085, 2723),
		new cImage.CreateNewInstanceBySourceWidthAndHeight('005-front_left_2.jpg', 		3621, 2411),
		new cImage.CreateNewInstanceBySourceWidthAndHeight('001-cover_large.jpg', 		4102, 2731),
		new cImage.CreateNewInstanceBySourceWidthAndHeight('005-front_left_4.jpg', 		4194, 2793),
		new cImage.CreateNewInstanceBySourceWidthAndHeight('006-left.jpg', 				4086, 2725),
		new cImage.CreateNewInstanceBySourceWidthAndHeight('008-rear_2.jpg', 			3471, 2312),
		new cImage.CreateNewInstanceBySourceWidthAndHeight('008-rear_3.jpg', 			4082, 2723),
		new cImage.CreateNewInstanceBySourceWidthAndHeight('009-rear_right.jpg', 		4608, 3072),
		new cImage.CreateNewInstanceBySourceWidthAndHeight('010-rear_spoiler.jpg', 		4608, 3072),
		new cImage.CreateNewInstanceBySourceWidthAndHeight('010-rear_spoiler_3.jpg', 	1911, 1186),
		new cImage.CreateNewInstanceBySourceWidthAndHeight('011-going_inside.jpg', 		4121, 2746),
		new cImage.CreateNewInstanceBySourceWidthAndHeight('012-inside_front_2.jpg', 	4048, 2699),
		new cImage.CreateNewInstanceBySourceWidthAndHeight('013-inside_front.jpg', 		4302, 2954),
		new cImage.CreateNewInstanceBySourceWidthAndHeight('014-inside_backseat.jpg', 	3072, 4608),
		new cImage.CreateNewInstanceBySourceWidthAndHeight('015-inside_front_3_1.jpg', 	2441, 4247),
		new cImage.CreateNewInstanceBySourceWidthAndHeight('015-inside_front_5.jpg', 	4608, 3072),
		new cImage.CreateNewInstanceBySourceWidthAndHeight('015-inside_front_6.jpg', 	4608, 3072)
	)
);

var items = new Array();
function InitalizePhotoGalleryItems()
{
	var width = window.innerWidth;
	var height = window.innerHeight;
	var hd = false;
	if(width > 1600 && height > 1000)
	{
		hd = true;
	}
	for (var ii = 0; ii < imageList._ImageList.length; ii++) 
	{
		var curImage = imageList._ImageList[ii];
		items.push(
			new function() 
			{
				this.src = "images/"
				if(hd == true)
					this.src += "large/";
				else
					this.src += "medium/";
				this.src += curImage._Source;
				this.w = curImage._Width;
				this.h = curImage._Height;
				this.pid = curImage._Source;
			}
		);
	}
}


var openPhotoSwipe = function(ImageSource) 
{
    var pswpElement = document.querySelectorAll('.pswp')[0];

    // define options (if needed)
    var options = {
        history: false,
        focus: false,
        showAnimationDuration: 0,
        hideAnimationDuration: 0
    };
    
    var index = -1;
    if(ImageSource != undefined)
    {
		for(var ii = 0; ii < items.length; ii++)
		{
			if(items[ii].pid == ImageSource)
			{
				index = ii;
				break;
			}
		}
    }
    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
    
    if(index >= 0)
    {
		gallery.goTo(index);
	}
};

function openPhotoSwipeWithCurrentImageSource(FullImageSource)
{
	var lastPathChar = FullImageSource.lastIndexOf('/');
	var ImageSource = FullImageSource.substr(lastPathChar+1);
	openPhotoSwipe(ImageSource);
}

var _ImageCarouselPosition = 0;
function InitializeImageCarousel()
{
	for(var ii = 0; ii < 5; ii++)
	{
		var curPosition = _ImageCarouselPosition + ii;
		if(curPosition >= imageList._ImageList.length)
		{
			curPosition -= imageList._ImageList.length;
		}
		
		var imageThumbnailId = "image_thumbnail_" + (ii+1);
		var curImage = document.getElementById(imageThumbnailId);
		curImage.src = "images/thumbnails/" + imageList._ImageList[curPosition]._Source;
	}
}

function ImageCarouselSlideLeft()
{
	_ImageCarouselPosition -= 5;
	if(_ImageCarouselPosition < 0)
	{
		_ImageCarouselPosition += imageList._ImageList.length;
	}
	InitializeImageCarousel();
}

function ImageCarouselSlideRight()
{
	_ImageCarouselPosition += 5;
	if(_ImageCarouselPosition >= imageList._ImageList.length)
	{
		_ImageCarouselPosition -= imageList._ImageList.length;
	}
	InitializeImageCarousel();
}

function InitializeScripts()
{
	InitalizePhotoGalleryItems();
	InitializeImageCarousel();
}

$(document).ready(function() {
    
    var dynamic = $('.section-text');
    var static = $('.section-image');
    
    static.height(dynamic.height());

});
