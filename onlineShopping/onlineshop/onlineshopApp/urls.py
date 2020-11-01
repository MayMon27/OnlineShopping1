from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter

from onlineshopApp import views
from django.contrib import admin
from django.urls import path

from django.conf.urls.static import static
from django.conf import settings

router = DefaultRouter()
router.register(r'Customer', views.CustomerViewSet)
router.register(r'CartList',views.CartListViewSet)
router.register(r'CustomerCheck',views.CustomerCheckViewSet)
router.register(r'Owner',views.OwnerViewSet)
router.register(r'Product',views.ProductViewSet)
router.register(r'Invoice',views.InvoiceViewSet)
router.register(r'LastInvoice',views.LastInvoiceViewSet)
router.register(r'Rating',views.RatingViewSet)
router.register(r'Comment',views.CommentViewSet)
router.register(r'Cart',views.CartViewSet)
router.register(r'AdminInvoice',views.AdminInvoiceViewSet)
router.register(r'Categories',views.CategoriesViewSet)
router.register(r'CategoriesCH',views.CategoriesCHViewSet)
router.register(r'CategoriesParent',views.CategoriesParentViewSet)
router.register(r'SelectCategoriesId',views.SelectCategoriesIdViewSet)
router.register(r'Order',views.OrderViewSet)
router.register(r'OrderList',views.OrderListViewSet)
router.register(r'CustomerCheck',views.CustomerCheckViewSet)
router.register(r'SearchedProduct',views.SearchedProductViewSet)
router.register(r'ProductRating',views.ProductRatingViewSet)
router.register(r'ProductByCategoriesId',views.ProductByCategoriesIdViewSet)
router.register(r'TPTCCategories',views.TPTCCategoriesViewSet)
router.register(r'QQPM',views.QQPMViewSet)
router.register(r'productComment',views.productCommentViewSet)
# router.register(r'cart_delete',views.cart_deleteViewSet)

urlpatterns = [
    path('Admin/', admin.site.urls),
    url(r'^', include(router.urls)),

]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
