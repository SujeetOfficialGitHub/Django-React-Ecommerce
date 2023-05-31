from django.shortcuts import get_object_or_404
from payment.serializers import OrderSerializer, OrderItemSerializer
from payment.models import Order, OrderItems
import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

import os
import razorpay
from rest_framework.decorators import api_view
from rest_framework.response import Response



@permission_classes([IsAuthenticated])
@api_view(['POST'])
def start_payment(request):
    # request.data is coming from frontend
    total_amt = request.data['amount']
    cart = json.loads(request.data['cart'])

    # setup razorpay client this is the client to whome user is paying money that's you
    client = razorpay.Client(auth=(os.environ.get('PUBLIC_KEY'), os.environ.get('SECRET_KEY')))

    # create razorpay order
    # the amount will come in 'paise' that means if we pass 50 amount will become
    # 0.5 rupees that means 50 paise so we have to convert it in rupees. So, we will 
    # mumtiply it by 100 so it will be 50 rupees.
    payment = client.order.create({"amount": int(total_amt) * 100, 
                                   "currency": "INR", 
                                   "payment_capture": "1"})

    # we are saving an order with isPaid=False because we've just initialized the order
    # we haven't received the money we will handle the payment succes in next 
    # function
    
    order = Order.objects.create(
        user = request.user,
        total_amt=total_amt,
        payment_id= payment['id']
    )

    order_items = None
    for items in cart:
        order_items = OrderItems.objects.create(
            order=order,
            payment_id= payment['id'],
            title= items['product'],
            image=items['image'],
            price=items['selling_price'],
            quantity=items['quantity'],
            total= items['quantity']*items['selling_price']
        )


    serializer = OrderItemSerializer(order_items)

    data = {
        "payment": payment,
        "order": serializer.data
    }
    return Response(data)

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def handle_payment_success(request):
    # request.data is coming from frontend
    res = json.loads(request.data["response"])

    """res will be:
    {'razorpay_payment_id': 'pay_G3NivgSZLx7I9e', 
    'razorpay_order_id': 'order_G3NhfSWWh5UfjQ', 
    'razorpay_signature': '76b2accbefde6cd2392b5fbf098ebcbd4cb4ef8b78d62aa5cce553b2014993c0'}
    this will come from frontend which we will use to validate and confirm the payment
    """

    ord_id = ""
    raz_pay_id = ""
    raz_signature = ""

    # res.keys() will give us list of keys in res
    for key in res.keys():
        if key == 'razorpay_order_id':
            ord_id = res[key]
        elif key == 'razorpay_payment_id':
            raz_pay_id = res[key]
        elif key == 'razorpay_signature':
            raz_signature = res[key]

    # get order by payment_id which we've created earlier with isPaid=False
    order = Order.objects.get(payment_id=ord_id)

    # we will pass this whole data in razorpay client to verify the payment
    data = {
        'razorpay_order_id': ord_id,
        'razorpay_payment_id': raz_pay_id,
        'razorpay_signature': raz_signature
    }

    client = razorpay.Client(auth=(os.environ.get('PUBLIC_KEY'), os.environ.get('SECRET_KEY')))

    # checking if the transaction is valid or not by passing above data dictionary in 
    # razorpay client if it is "valid" then check will return None
    check = client.utility.verify_payment_signature(data)
    print(check)
    if check is None:
        print("Redirect to error url or error page")
        return Response({'error': 'Something went wrong'})

    # if payment is successful that means check is None then we will turn isPaid=True
    order.paid_status = True
    order.save()

    res_data = {
        'message': 'payment successfully received!'
    }

    return Response(res_data)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def ordered_product_view(request): 
    ordered_items = OrderItems.objects.filter(user=request.user)
    serialize = OrderItemSerializer(ordered_items, many=True)
    return Response(serialize.data)

