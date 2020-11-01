from rest_framework import serializers

from onlineshopApp.models import Customer,Owner,Product,Invoice,Rating,Comment,Cart,Categories,Order


class CustomerSerializer(serializers.ModelSerializer):
	class Meta:
		model=Customer
		fields = ('id','name', 'email', 'password', 'address','phone_Number','card_Number','join_Date')


class OwnerSerializer(serializers.ModelSerializer):
	class Meta:
		model=Owner
		fields = ('id','name', 'email', 'password')


class ProductSerializer(serializers.ModelSerializer):
	class Meta:
		model=Product
		fields = ('id','productCode','name','categories_id','brand','description','price','color','size','imageOne','imageTwo','storedQty','soldQty','stored_Date')

# class ProductDetailSerializer(serializers.ModelSerializer):
# 	class Meta:
# 		model=ProductDetail
# 		fields = ('id','product_id','color','size','price','image','stored_Quantity','sold_Quantity')


class InvoiceSerializer(serializers.ModelSerializer):
	class Meta:
		model=Invoice
		fields = ('id','customer_id','address','phone_Number','card_Number','invoice_Date','comfirm_Date','delivered')


class RatingSerializer(serializers.ModelSerializer):
	class Meta:
		model=Rating
		fields = ('id','customer_id','product_id','productCode','rating_Value')


class CommentSerializer(serializers.ModelSerializer):
	class Meta:
		model=Comment
		fields = ('id','customer_id','product_id','productCode','rating_Value','message','date')


class CartSerializer(serializers.ModelSerializer):
	class Meta:
		model=Cart
		fields = ('id','customer_id','product_id','quantity')


class CategoriesSerializer(serializers.ModelSerializer):
	class Meta:
		model=Categories
		fields = ('id','parent_Categories','child_Categories')


class OrderSerializer(serializers.ModelSerializer):
	class Meta:
		model=Order
		fields = ('id','invoice_id','product_id','order_Quantity','delivered')
