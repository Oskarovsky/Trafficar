# coding=utf-8

from sqlalchemy import Column, String, Integer
from .entity import Entity, Base

class Box(Entity, Base):
    __tablename__ = 'boxes'

    name = Column(String)
    description = Column(String)
    weight = Column(Integer)
    width = Column(Integer)
    height = Column(Integer)
    length = Column(Integer)

    def __init__(self, name, description, weight, width, height, length, created_by):
        Entity.__init__(self, created_by)
        self.name = name
        self.description = description
        self.weight = weight
        self.width = width
        self.height = height
        self.length = length
