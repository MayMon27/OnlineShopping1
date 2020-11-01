from django.shortcuts import render
from rest_framework import viewsets
from django.http import HttpRequest
from rest_framework import filters
from tkinter import messagebox
from django.shortcuts import get_object_or_404
# from django_filters.rest_framework import DjangoFilterBackend

from onlineshopApp.models import Customer,Owner,Product,Invoice,Rating,Comment,Cart,Categories,Order
from onlineshopApp.serializers import CustomerSerializer,OwnerSerializer,ProductSerializer,InvoiceSerializer,RatingSerializer,CommentSerializer,CartSerializer,CategoriesSerializer,OrderSerializer
# Create your views here.

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class CustomerCheckViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    def get_queryset(self):
        qs=super().get_queryset()
        user_id=self.request.query_params.get('user_id')
        email = self.request.query_params.get('email')
        password = self.request.query_params.get('password')
        if email!='empty' and password==None:
            tableQuery="select * from onlineshopApp_customer where email='"+email+"'"
            queryset =Customer.objects.raw(tableQuery)
            return queryset

        if user_id:
            queryset = Customer.objects.filter(id=user_id)
            return queryset
        if password:
            tableQuery="select * from onlineshopApp_customer where email='"+email+"' and  password='"+password+"'"
            queryset =Customer.objects.raw(tableQuery)
            return queryset

        return qs

class SearchedProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    def get_queryset(self):
        qs=super().get_queryset()
        pCtg=self.request.query_params.get('parent_Categories')
        pdCode=self.request.query_params.get('productCode')
        size=self.request.query_params.get('size')
        color=self.request.query_params.get('color')
        ctgId=self.request.query_params.get('categoriesId')
        name=self.request.query_params.get('name')


        if name=="pdlist":
            dbQuery="select p.id,p.productCode,p.imageOne,c.parent_Categories as name,c.child_Categories as brand,p.color,p.size,p.price,p.storedQty,p.soldQty,p.stored_Date FROM onlineshopApp_product as p ,onlineshopApp_categories as c where p.categories_id_id=c.id"
            queryset = Product.objects.raw(dbQuery)
            return queryset

        if pCtg:
            dbQuery="SELECT  p.id,p.productCode,p.name,p.price,p.imageOne FROM onlineshopApp_product as p ,onlineshopApp_categories as c WHERE p.categories_id_id=c.id and c.parent_Categories='"+pCtg+"'GROUP by p.productCode"

            queryset = Product.objects.raw(dbQuery)
            # print(queryset)
            return queryset

        if pdCode and name and size=="true" :
            dbQuery="SELECT id,size FROM onlineshopApp_product WHERE productCode="+pdCode+" GROUP by size"
            queryset = Product.objects.raw(dbQuery)
            return queryset

        if pdCode and name=='selectsize' and  size!="true" :

            dbQuery="SELECT id,color FROM onlineshopApp_product WHERE productCode="+pdCode+" AND size='"+size+"'"
            queryset = Product.objects.raw(dbQuery)
            return queryset

        if pdCode and name and color=="true" :
            dbQuery="SELECT id,color FROM onlineshopApp_product WHERE productCode="+pdCode+" GROUP by color"
            queryset = Product.objects.raw(dbQuery)
            return queryset

        if pdCode and name=='selectcolor' and  color!="true" :
            dbQuery="SELECT id,size FROM onlineshopApp_product WHERE productCode="+pdCode+" AND  color='"+color+"'"
            queryset = Product.objects.raw(dbQuery)
            return queryset

        if pdCode and color=="false":
            dbQuery="SELECT * FROM onlineshopApp_product WHERE productCode="+pdCode
            queryset = Product.objects.raw(dbQuery)
            return queryset

        if pdCode and ctgId:
            dbQuery="SELECT id,productCode,name,price,imageOne FROM onlineshopApp_product WHERE categories_id_id="+ctgId+" and productCode!="+pdCode+" GROUP by productCode LIMIT 4"
            queryset = Product.objects.raw(dbQuery)
            return queryset

        if name == 'max':
            dbQuery="SELECT id,max(productCode) as productCode FROM onlineshopApp_product"
            queryset = Product.objects.raw(dbQuery)
            return queryset

        if pdCode and color!="true" and size!='true':
            dbQuery="SELECT * FROM onlineshopApp_product WHERE productCode="+pdCode+" and color='"+color+"' and size='"+size+"'"
            queryset = Product.objects.raw(dbQuery)
            return queryset

        return qs


class OwnerViewSet(viewsets.ModelViewSet):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer

    def get_queryset(self):
        qs=super().get_queryset()

        email = self.request.query_params.get('email')
        password = self.request.query_params.get('password')

        if password:
            tableQuery="select * from onlineshopApp_owner where email='"+email+"' and  password='"+password+"'"
            queryset =Owner.objects.raw(tableQuery)
            return queryset
        return qs


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    def get_queryset(self):
        qs=super().get_queryset()
        customer_id=self.request.query_params.get('customer_id')
        productCode=self.request.query_params.get('productCode')
        if customer_id:
            dbQuery="SELECT i.id FROM onlineshopApp_invoice as i ,onlineshopApp_product as p,onlineshopApp_order as o WHERE  p.id=o.product_id_id and o.invoice_id_id=i.id and p.productCode="+productCode+" and i.customer_id_id="+customer_id
            queryset = Invoice.objects.raw(dbQuery)
            return queryset

        return qs

class AdminInvoiceViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    def get_queryset(self):
        qs=super().get_queryset()
        state=self.request.query_params.get('address')
        if state:
            dbQuery="SELECT p.id ,i.id as productCode,sum(o.order_Quantity*p.price)as price,c.name as name,i.phone_Number as size,i.address as color,i.invoice_Date as stored_Date from onlineshopApp_order as o ,onlineshopApp_product as p INNER JOIN onlineshopApp_invoice as i INNER JOIN onlineshopApp_customer as c on o.product_id_id=p.id and i.id=o.invoice_id_id and i.customer_id_id=c.id and i.delivered='"+state+"' GROUP by i.id"
            queryset = Product.objects.raw(dbQuery)
            return queryset

        return qs

class LastInvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    def get_queryset(self):
        qs=super().get_queryset()
        dbquery = "SELECT id FROM onlineshopApp_invoice ORDER by id DESC LIMIT 1"
        # print(dbquery)
        queryset = Invoice.objects.raw(dbquery)
        return queryset
        return qs

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer

class ProductRatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    def get_queryset(self):
        qs=super().get_queryset()
        productCode=self.request.query_params.get('productCode')
        customer_id=self.request.query_params.get('customer_id')
        if customer_id and productCode:
            dbQuery="SELECT id,rating_Value FROM onlineshopApp_rating WHERE customer_id_id="+customer_id+" AND productCode="+productCode
            queryset = Rating.objects.raw(dbQuery)
            return queryset
        else:
            dbQuery="SELECT id,sum(rating_Value) as rating_Value ,count(id) as customer_id_id FROM onlineshopApp_rating WHERE productCode="+productCode+"  GROUP by productCode"
            queryset = Rating.objects.raw(dbQuery)
            return queryset
        return qs

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class productCommentViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    def get_queryset(self):
        qs=super().get_queryset()
        productCode = self.request.query_params.get('productCode')
        if productCode:
            dbQuery="SELECT cm.id,cu.name,cm.message as address,cm.date as join_Date FROM onlineshopApp_comment as cm ,onlineshopApp_customer as cu WHERE cm.productCode="+productCode+" AND cm.customer_id_id=cu.id"
            queryset = Customer.objects.raw(dbQuery)
            return queryset
        return qs

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    def get_queryset(self):
        qs=super().get_queryset()
        customer_id = self.request.query_params.get('customer_id')
        state = self.request.query_params.get('state')

        if state=='navBar':
            dbQuery="SELECT id,count(id)as quantity FROM onlineshopApp_cart WHERE customer_id_id="+customer_id
            print(dbQuery)
            queryset = Cart.objects.raw(dbQuery)
            return queryset

        elif state=='deleteCart':
            dbQuery="DELETE FROM onlineshopApp_cart WHERE customer_id_id="+customer_id
            queryset = Cart.objects.raw(dbQuery)
            return queryset

        return qs


class CategoriesViewSet(viewsets.ModelViewSet):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer

class CategoriesParentViewSet(viewsets.ModelViewSet):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer
    def get_queryset(self):
        qs=super().get_queryset()
        dbQuery="SELECT * from onlineshopApp_categories group by parent_Categories"
        queryset = Categories.objects.raw(dbQuery)
        return queryset
        return qs

class CategoriesCHViewSet(viewsets.ModelViewSet):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer
    def get_queryset(self):
        qs=super().get_queryset()
        dbQuery="SELECT * from onlineshopApp_categories group by child_Categories"
        queryset = Categories.objects.raw(dbQuery)
        return queryset
        return qs

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class TPTCCategoriesViewSet(viewsets.ModelViewSet):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer
    def get_queryset(self):
        qs=super().get_queryset()
        p = self.request.query_params.get('parent_Categories')
        if p:
              queryset = Categories.objects.filter(parent_Categories=p)
              return queryset
        return qs

class SelectCategoriesIdViewSet(viewsets.ModelViewSet):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer
    def get_queryset(self):
        qs=super().get_queryset()
        m = self.request.query_params.get('parent_Categories')
        c = self.request.query_params.get('child_Categories')
        # if m!=null && c=="All":
        if m:
            queryset = Categories.objects.filter(parent_Categories=m,child_Categories=c)
            print(queryset)
            return queryset
        return qs

class QQPMViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    def get_queryset(self):
        qs=super().get_queryset()
        m = self.request.query_params.get('parent_Categories')
        if m:
            dbQuery="SELECT p.id,p.productCode,p.name,p.price,p.imageOne,c.parent_Categories as size FROM onlineshopApp_product as p,onlineshopApp_categories as c WHERE p.categories_id_id=c.id and c.parent_Categories='"+m+"' GROUP by p.productCode"
            queryset = Product.objects.raw(dbQuery)
            return queryset
        return qs

class CartListViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    def get_queryset(self):
        qs=super().get_queryset()
        customerid = self.request.query_params.get('customerid')

        if customerid:
            print("cartList")
            dbQuery="SELECT p.id,c.id as soldQty,p.productCode,p.name,p.price,p.imageOne,c.quantity as storedQty FROM onlineshopApp_product as p,onlineshopApp_cart as c WHERE c.customer_id_id="+customerid+" AND p.id=c.product_id_id"
            queryset = Product.objects.raw(dbQuery)
            return queryset
        return qs

class CustomerCheckViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    def get_queryset(self):
        qs=super().get_queryset()
        user_id=self.request.query_params.get('user_id')
        email = self.request.query_params.get('email')
        password = self.request.query_params.get('password')
        if user_id:
            queryset = Customer.objects.filter(id=user_id)
            return  queryset
        if email:
            queryset = Customer.objects.filter(email=email,password=password)
            return queryset
        return qs


class ProductByCategoriesIdViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    def get_queryset(self):
        qs=super().get_queryset()
        m = self.request.query_params.get('categories_id')
        if m == 'All':
            dbQuery="SELECT * FROM onlineshopApp_product  GROUP by productCode"
            queryset = Product.objects.raw(dbQuery)
            return queryset

        else:
            dbQuery="SELECT * FROM onlineshopApp_product WHERE categories_id_id="+m+"  GROUP by productCode"
            queryset = Product.objects.raw(dbQuery)
            return queryset
        return qs

class OrderListViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    def get_queryset(self):
        qs=super().get_queryset()
        customer_id=self.request.query_params.get('customer_id')
        invoice_id = self.request.query_params.get('invoice_id')

        if customer_id:
            dbQuery="SELECT p.id,i.id as productCode,p.imageOne,i.invoice_Date as stored_Date,p.name,p.color,p.size,p.price,o.order_Quantity as storedQty FROM onlineshopApp_customer as cu,onlineshopApp_invoice as i,onlineshopApp_order as o,onlineshopApp_product as p WHERE cu.id="+customer_id+" and cu.id=i.customer_id_id and o.invoice_id_id=i.id and o.product_id_id=p.id ORDER by i.id  DESC"
            queryset =Product.objects.raw(dbQuery)
            return queryset

        if invoice_id:
            dbQuery=" SELECT p.id,i.id as productCode,p.imageOne,p.color,p.size,p.price,o.order_Quantity as storedQty ,p.soldQty FROM onlineshopApp_customer as cu,onlineshopApp_invoice as i,onlineshopApp_order as o,onlineshopApp_product as p WHERE i.id="+invoice_id+" and  cu.id=i.customer_id_id and o.invoice_id_id=i.id and o.product_id_id=p.id"
            queryset =Product.objects.raw(dbQuery)
            return queryset

        return qs
