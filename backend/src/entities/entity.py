# this class is using like as the superclass to all entities
# it is useful to avoid having to repeat boilerplate code to connect to the database and to define common properties

from datetime import datetime
from sqlalchemy import create_engine, Column, String, Integer, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

