
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
		new cImage.CreateNewInstanceBySource('001-cover_large.jpg'),
		new cImage.CreateNewInstanceBySource('002-front_right_1.jpg'),
		new cImage.CreateNewInstanceBySource('002-front_right_2.jpg'),
		new cImage.CreateNewInstanceBySource('003-front_3_Not.jpg'),
		new cImage.CreateNewInstanceBySource('005-front_left_2.jpg'),
		new cImage.CreateNewInstanceBySource('005-front_left_4.jpg'),
		new cImage.CreateNewInstanceBySource('005-front_left_6.jpg'),
		new cImage.CreateNewInstanceBySource('006-left.jpg'),
		new cImage.CreateNewInstanceBySource('007-rear_left.jpg'),
		new cImage.CreateNewInstanceBySource('008-rear_2.jpg'),
		new cImage.CreateNewInstanceBySource('008-rear_3.jpg'),
		new cImage.CreateNewInstanceBySource('009-rear_right.jpg'),
		new cImage.CreateNewInstanceBySource('010-rear_spoiler.jpg'),
		new cImage.CreateNewInstanceBySource('010-rear_spoiler_3.jpg'),
		new cImage.CreateNewInstanceBySource('011-going_inside.jpg'),
		new cImage.CreateNewInstanceBySource('011.jpg'),
		new cImage.CreateNewInstanceBySource('012-inside_front_2.jpg'),
		new cImage.CreateNewInstanceBySource('013-inside_front.jpg'),
		new cImage.CreateNewInstanceBySourceWidthAndHeight('014-inside_backseat.jpg', 3072, 4608),
		new cImage.CreateNewInstanceBySourceWidthAndHeight('015-inside_front_3_1.jpg', 3072, 4608),
		new cImage.CreateNewInstanceBySource('015-inside_front_4.jpg'),
		new cImage.CreateNewInstanceBySource('015-inside_front_5.jpg'),
		new cImage.CreateNewInstanceBySource('015-inside_front_6.jpg'),
		new cImage.CreateNewInstanceBySourceWidthAndHeight('015-inside_front_7.jpg', 3072, 4608)
	)
);

var items = new Array();
function InitalizePhotoGalleryItems()
{
	for (var ii = 0; ii < imageList._ImageList.length; ii++) 
	{
		var curImage = imageList._ImageList[ii];
		items.push(
			new function() 
			{
				this.src = "images/large/" + curImage._Source;
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

function InitializeScripts()
{
	InitalizePhotoGalleryItems();
}
