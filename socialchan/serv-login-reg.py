#!/usr/bin/env python
import os
os.environ['DJANGO_SETTINGS_MODULE'] = 'socialchan.settings'
import django
django.setup()
import pika
from pickle import loads, dumps
from base64 import b64decode, b64encode
import functions

#parameters = pika.URLParameters('amqp://empifJS6:JLdttxhTIzSoZSsgWvbPf8PFTRySIifY@leaping-marjoram-40.bigwig.lshift.net:10743/MxfKYu-j5XB0')  

#connection = pika.BlockingConnection(parameters)

#channel = connection.channel()

#def on_request(ch, method, props, body):
    #print " llegooooo"
    #data = loads( b64decode(body) )
    #response = getattr(functions, data["command"] )(data["args"])	
    #response =	b64encode( dumps(response) )
   

    #ch.basic_publish(exchange='',
                     #routing_key=props.reply_to,
                     #properties=pika.BasicProperties(correlation_id = \
                                                     #props.correlation_id),
                     #body=response)
    #ch.basic_ack(delivery_tag = method.delivery_tag)

#channel.basic_qos(prefetch_count=1)
#channel.basic_consume(on_request, queue='rpc_queue')

#print " [x] Awaiting RPC requests"
#channel.start_consuming()

def on_request(ch, method, props, body):
    print " llegooooo"
    data = loads( b64decode(body) )
    response = getattr(functions, data["command"] )(data["args"])	
    response =	b64encode( dumps(response) )
   

    ch.basic_publish(exchange='',
                     routing_key=props.reply_to,
                     properties=pika.BasicProperties(correlation_id = \
                                                     props.correlation_id),
                     body=response)
    ch.basic_ack(delivery_tag = method.delivery_tag)


def on_open(connection):

    connection.channel(on_channel_open)

# Step #4
def on_channel_open(channel):
	
    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(on_request, queue='rpc_queue')
    print " [x] Awaiting RPC requests"
   



# Step #1: Connect to RabbitMQ
parameters = pika.URLParameters('amqp://empifJS6:JLdttxhTIzSoZSsgWvbPf8PFTRySIifY@leaping-marjoram-40.bigwig.lshift.net:10743/MxfKYu-j5XB0')  

connection = pika.SelectConnection(parameters=parameters,
                                   on_open_callback=on_open)




try:

    # Step #2 - Block on the IOLoop
    connection.ioloop.start()

# Catch a Keyboard Interrupt to make sure that the connection is closed cleanly
except KeyboardInterrupt:

    # Gracefully close the connection
    connection.close()

    # Start the IOLoop again so Pika can communicate, it will stop on its own when the connection is closed
    connection.ioloop.start()
