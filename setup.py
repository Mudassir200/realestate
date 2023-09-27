from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in realestate/__init__.py
from realestate import __version__ as version

setup(
	name="realestate",
	version=version,
	description="Real Estate",
	author="Mudassir",
	author_email="mudassir.inception@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
