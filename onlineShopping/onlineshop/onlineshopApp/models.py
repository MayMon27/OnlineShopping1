from django.db import models
import datetime


# Create your models here.
class Customer(models.Model):
	name = models.CharField(max_length=100)
	email=models.EmailField(max_length=100,unique=True)
	password=models.CharField(max_length=100)
	address = models.CharField(max_length=500)
	phone_Number=models.CharField(max_length=15)
	card_Number=models.CharField(max_length=40)
	join_Date=models.DateField(default=datetime.date.today)

	class Meta:
		ordering = ('id',)
	def save(self, *args, **kwargs):
		super(Customer, self).save(*args, **kwargs)


class Owner(models.Model):
	name = models.CharField(max_length=100)
	email=models.EmailField(max_length=100,unique=True)
	password=models.CharField(max_length=100)
	class Meta:
		ordering = ('id',)
	def save(self, *args, **kwargs):
		super(Owner, self).save(*args, **kwargs)

class Categories(models.Model):
	parent_Categories=models.CharField(max_length=100)
	child_Categories=models.CharField(max_length=100)
	class Meta:
		ordering = ('id',)
	def save(self, *args, **kwargs):
		super(Categories, self).save(*args, **kwargs)

class Product(models.Model):

	productCode=models.IntegerField()
	name=models.CharField(max_length=100)
	categories_id=models.ForeignKey(Categories, related_name="product_id", on_delete=models.CASCADE)
	brand=models.CharField(max_length=50)
	description = models.CharField(max_length=300)
	price=models.IntegerField()
	color=models.CharField(max_length=30)
	size=models.CharField(max_length=50)
	imageOne=models.TextField(blank=True)
	imageTwo=models.TextField(blank=True)
	storedQty=models.IntegerField()
	soldQty=models.IntegerField(default=0)
	stored_Date=models.DateField(default=datetime.date.today)
	class Meta:
		ordering = ('id',)
	def save(self, *args, **kwargs):
		super(Product, self).save(*args, **kwargs)


class Invoice(models.Model):
	customer_id=models.ForeignKey(Customer,related_name="invoice_id",on_delete=models.CASCADE)
	address = models.CharField(max_length=500,default='')
	# email=models.EmailField(max_length=100)
	phone_Number=models.CharField(max_length=25)
	card_Number=models.CharField(max_length=25)
	# total_Price=models.IntegerField()
	invoice_Date=models.DateField(default=datetime.date.today)
	comfirm_Date=models.DateField(default=datetime.date.today)
	delivered=models.CharField(max_length=25,default=False)
	class Meta:
		ordering = ('id',)
	def save(self, *args, **kwargs):
		super(Invoice, self).save(*args, **kwargs)


class Rating(models.Model):
	customer_id=models.ForeignKey(Customer,related_name="rating_id",on_delete=models.CASCADE)
	product_id=models.ForeignKey(Product,related_name="rating_id",on_delete=models.CASCADE,default=0)
	productCode=models.IntegerField(default=0)
	rating_Value=models.IntegerField()
	class Meta:
		ordering = ('id',)
	def save(self, *args, **kwargs):
		super(Rating, self).save(*args, **kwargs)


class Comment(models.Model):
	customer_id=models.ForeignKey(Customer,related_name="comment_id",on_delete=models.CASCADE)
	product_id=models.ForeignKey(Product,related_name="comment_id",on_delete=models.CASCADE,default=0)
	productCode=models.IntegerField(default=0)
	rating_Value=models.IntegerField(default=0)
	message = models.CharField(max_length=500,default='')
	date=models.DateField(default=datetime.date.today)
	class Meta:
		ordering = ('id',)
	def save(self, *args, **kwargs):
		super(Comment, self).save(*args, **kwargs)


class Cart(models.Model):
	customer_id=models.ForeignKey(Customer,related_name="cart_id",on_delete=models.CASCADE)
	product_id=models.ForeignKey(Product,related_name="cart_id",on_delete=models.CASCADE)
	quantity = models.IntegerField(default = 1)
	class Meta:
		ordering = ('id',)
	def save(self, *args, **kwargs):
		super(Cart, self).save(*args, **kwargs)


class Order(models.Model):
	invoice_id=models.ForeignKey(Invoice,related_name="order_id",on_delete=models.CASCADE)
	product_id=models.ForeignKey(Product,related_name="order_id",on_delete=models.CASCADE)
	order_Quantity=models.IntegerField(default=1)
	delivered=models.CharField(max_length=25,default=False)

	# price=models.IntegerField()
	class Meta:
		ordering = ('id',)
	def save(self, *args, **kwargs):
		super(Order, self).save(*args, **kwargs)
