from django.urls import path
from . import views

urlpatterns = [
    path('home', views.RoomView.as_view()),
    path('create-room', views.CreateRoomView.as_view()),
    path('get-room', views.GetRoomView.as_view()),
    path('join-room', views.JoinRoomView.as_view()),
    path('user-in-room', views.UserInRoom.as_view()),
    path('leave-room', views.LeaveRoom.as_view()),
    path('update-room', views.UpdateRoomView.as_view()),
]
