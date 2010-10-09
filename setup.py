from setuptools import setup, find_packages
import os

version = '0.1'

setup(name='aaolm.portlet.floating',
      version=version,
      description="A portlet that will 'sticky' to the screen as you scroll down the page.",
      long_description=open("README.txt").read() + "\n" +
                       open(os.path.join("docs", "HISTORY.txt")).read(),
      # Get more strings from
      # http://pypi.python.org/pypi?%3Aaction=list_classifiers
      classifiers=[
        "Framework :: Plone",
        "Programming Language :: Python",
        ],
      keywords='',
      author='Shane Graber',
      author_email='sgraber@gmail.com',
      url='http://github.com/sgraber/',
      license='GPL',
      packages=find_packages(exclude=['ez_setup']),
      namespace_packages=['aaolm', 'aaolm.portlet'],
      include_package_data=True,
      zip_safe=False,
      install_requires=[
          'setuptools',
          # -*- Extra requirements: -*-
      ],
      entry_points="""
      # -*- Entry points: -*-

      [z3c.autoinclude.plugin]
      target = plone
      """,
      )
